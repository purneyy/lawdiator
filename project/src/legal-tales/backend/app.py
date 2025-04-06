import os
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

def load_text_cases():
    cases = []
    case_dir = os.path.join(os.path.dirname(__file__), 'data', 'cases')
    
    for filename in os.listdir(case_dir):
        if filename.endswith('.txt'):
            with open(os.path.join(case_dir, filename), 'r', encoding='utf-8') as f:
                text = f.read().strip()
                
                # Extract title and year from first line (e.g., "Case Name (YYYY)")
                first_line = text.split('\n')[0]
                try:
                    title = first_line.split('(')[0].strip()
                    year = re.search(r'\((.*?)\)', first_line).group(1)
                except:
                    title = filename.replace('.txt', '')
                    year = "Unknown"
                
                # Parse content sections
                sections = {
                    'background': '',
                    'questions': [],
                    'arguments': {'petitioner': '', 'state': ''},
                    'decision': '',
                    'legacy': ''
                }
                
                current_section = None
                for line in text.split('\n')[1:]:
                    line = line.strip()
                    if not line:
                        continue
                        
                    # Detect section headers
                    if line.endswith(':'):
                        current_section = line[:-1].lower().replace(' ', '_')
                        continue
                        
                    # Parse content based on current section
                    if current_section == 'legal_questions' and line.startswith(('1.', '2.', '3.', '4.', '5.', '-')):
                        sections['questions'].append(re.sub(r'^\d+\.\s*', '', line))
                    elif current_section == 'arguments':
                        if 'petitioner' in line.lower():
                            sections['arguments']['petitioner'] = line.split(':', 1)[1].strip()
                        elif 'state' in line.lower():
                            sections['arguments']['state'] = line.split(':', 1)[1].strip()
                    elif current_section in sections:
                        if isinstance(sections[current_section], str):
                            sections[current_section] += line + '\n'
                
                cases.append({
                    'id': len(cases) + 1,
                    'title': title,
                    'year': year,
                    'sections': sections,
                    'raw_text': text  # Preserve original
                })
    return cases

cases = load_text_cases()
model = SentenceTransformer('all-MiniLM-L6-v2')

# Pre-encode searchable text for all cases
case_embeddings = []
for case in cases:
    search_text = f"{case['title']} {case['year']} " + \
                 f"{case['sections']['background']} " + \
                 ' '.join(case['sections']['questions']) + \
                 case['sections']['decision']
    case_embeddings.append(model.encode(search_text))

@app.route('/search', methods=['POST'])
def search():
    query = request.json.get('query', '').strip()
    if not query:
        return jsonify([])
        
    query_embedding = model.encode(query)
    
    results = []
    for idx, case in enumerate(cases):
        similarity = float(query_embedding @ case_embeddings[idx].T)
        results.append({
            'id': case['id'],
            'title': case['title'],
            'year': case['year'],
            'summary': case['sections']['background'][:200] + ('...' if len(case['sections']['background']) > 200 else ''),
            'similarity': similarity
        })
    
    return jsonify(sorted(results, key=lambda x: x['similarity'], reverse=True)[:5])

@app.route('/case/<int:case_id>', methods=['GET'])
def get_case(case_id):
    case = next((c for c in cases if c['id'] == case_id), None)
    if not case:
        return jsonify({"error": "Case not found"}), 404
        
    return jsonify({
        'meta': {
            'title': case['title'],
            'year': case['year'],
            'filename': f"{case['title'].replace(' ', '_')}_{case['year']}.txt"
        },
        'content': case['sections'],
        'raw_text': case['raw_text']  # Optional
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)