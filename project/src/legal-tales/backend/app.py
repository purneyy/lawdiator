import os
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

def load_cases():
    """Load and parse case files from the knowledge base"""
    cases = []
    case_dir = os.path.join(os.path.dirname(__file__), 'data', 'cases')
    
    for filename in os.listdir(case_dir):
        if filename.endswith('.txt'):
            with open(os.path.join(case_dir, filename), 'r', encoding='utf-8') as f:
                content = f.read()
                
                # Parse case metadata and sections
                case = parse_case_content(content)
                case['id'] = len(cases) + 1
                case['filename'] = filename
                cases.append(case)
    
    # Generate embeddings for semantic search
    for case in cases:
        search_text = f"{case['title']} {case['year']} {case['background']} {' '.join(case['legal_questions'])}"
        case['embedding'] = model.encode(search_text)
    
    return cases

def parse_case_content(text):
    """Parse structured content from case text files"""
    # Extract title and year from first line (e.g., "Case Name (YYYY)")
    first_line = text.split('\n')[0].strip()
    title = re.sub(r'\(\d{4}\)$', '', first_line).strip()
    year_match = re.search(r'\((\d{4})\)$', first_line)
    year = year_match.group(1) if year_match else "N/A"
    
    # Initialize sections
    sections = {
        'background': '',
        'legal_questions': [],
        'arguments': {'petitioner': '', 'state': ''},
        'decision': '',
        'dramatization': ''
    }
    
    current_section = None
    for line in text.split('\n')[1:]:
        line = line.strip()
        if not line:
            continue
        
        # Section headers
        if line.endswith(':'):
            current_section = line[:-1].lower().replace(' ', '_')
            continue
        
        # Legal questions (numbered list)
        if current_section == 'legal_questions' and re.match(r'^\d+\.', line):
            sections['legal_questions'].append(re.sub(r'^\d+\.\s*', '', line))
        
        # Arguments (petitioner vs state)
        elif current_section == 'arguments':
            if 'petitioner' in line.lower():
                sections['arguments']['petitioner'] = line.split(':', 1)[-1].strip()
            elif 'state' in line.lower():
                sections['arguments']['state'] = line.split(':', 1)[-1].strip()
        
        # Other sections
        elif current_section in sections:
            if isinstance(sections[current_section], str):
                sections[current_section] += line + '\n'
    
    return {
        'title': title,
        'year': year,
        'sections': sections,
        'raw_text': text
    }

def generate_drama_script(case):
    """Generate dramatic script from case data"""
    if case['sections']['dramatization']:
        return case['sections']['dramatization']
    
    # Fallback template if no dramatization exists
    return f"""
    [TITLE: {case['title']} ({case['year']})]
    [SCENE: Supreme Court of India]
    
    JUDGE: "This case presents fundamental questions: {case['sections']['legal_questions'][0]}"
    
    PETITIONER'S LAWYER: *stands dramatically* "Your Honor, {case['sections']['arguments']['petitioner'][:150]}..."
    
    STATE'S LAWYER: *coolly responds* "The government maintains that {case['sections']['arguments']['state'][:150]}..."
    
    [CLIMAX]
    JUDGE: *reads verdict* "{case['sections']['decision'][:200]}..."
    
    [EPILOGUE]
    NARRATOR: "This judgment established {case['sections']['legacy'][:100]}..."
    """

# Load cases at startup
cases = load_cases()

@app.route('/generate-script', methods=['POST'])
def generate_script():
    """Endpoint for script generation"""
    case_name = request.json.get('case_name', '').strip()
    
    # 1. Try exact match first
    exact_match = None
    for case in cases:
        if case_name.lower() == case['title'].lower():
            exact_match = case
            break
    
    if exact_match:
        return jsonify({
            'status': 'success',
            'result': {
                'title': exact_match['title'],
                'year': exact_match['year'],
                'summary': exact_match['sections']['decision'][:250] + ('...' if len(exact_match['sections']['decision']) > 250 else ''),
                'script': generate_drama_script(exact_match),
                'characters': ['JUDGE', 'PETITIONER', 'STATE LAWYER', 'NARRATOR']
            }
        })
    
    # 2. Fallback to semantic search
    query_embedding = model.encode(case_name)
    similarities = [
        (idx, float(query_embedding @ case['embedding'].T))
        for idx, case in enumerate(cases)
    ]
    similarities.sort(key=lambda x: x[1], reverse=True)
    
    return jsonify({
        'status': 'case_not_found',
        'message': 'Exact case not found. Similar cases:',
        'suggestions': [
            {
                'title': cases[idx]['title'],
                'year': cases[idx]['year'],
                'similarity': f"{sim*100:.1f}%"
            }
            for idx, sim in similarities[:3] if sim > 0.5
        ]
    })

@app.route('/case/<case_id>', methods=['GET'])
def get_case(case_id):
    """Endpoint to get raw case data"""
    try:
        case_id = int(case_id)
        case = next((c for c in cases if c['id'] == case_id), None)
        if not case:
            return jsonify({'error': 'Case not found'}), 404
        
        return jsonify(case)
    except ValueError:
        return jsonify({'error': 'Invalid case ID'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
