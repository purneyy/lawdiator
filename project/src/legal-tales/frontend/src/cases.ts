export interface LegalCase {
  title: string;
  background: string;
  legalQuestions: string[];
  arguments: {
    petitioners: string;
    respondents?: string;
  };
  decision: string[];
  legacy: string;
}

export const sampleCases: LegalCase[] = [
  {
    title: "Kesavananda Bharati v. State of Kerala (1973)",
    background: "His Holiness Kesavananda Bharati, the head of a Hindu Mutt in Kerala, challenged the Kerala Land Reforms Act which imposed restrictions on the management of religious property. The case expanded to challenge the validity of several constitutional amendments, particularly the 24th, 25th, and 29th Amendments.",
    legalQuestions: [
      "Does Parliament have unlimited power to amend the Constitution under Article 368?",
      "Can fundamental rights be abridged or taken away by constitutional amendments?",
      "What are the limitations, if any, on Parliament's amending power?"
    ],
    arguments: {
      petitioners: "The petitioners argued that Parliament's amending power was limited and could not destroy the \"basic structure\" or \"essential features\" of the Constitution.",
      respondents: "The state argued that Parliament had unlimited power to amend any part of the Constitution, including fundamental rights."
    },
    decision: [
      "Parliament has wide powers to amend the Constitution",
      "However, it cannot amend the \"basic structure\" or \"essential features\" of the Constitution",
      "What constitutes the \"basic structure\" would be determined by the Court on a case-by-case basis"
    ],
    legacy: "This decision has become the cornerstone of Indian constitutional law. It acts as a check on Parliament's power and ensures that the fundamental principles of the Constitution cannot be destroyed through amendments. It has been invoked in numerous subsequent cases to invalidate constitutional amendments and protect the Constitution's integrity."
  },
  {
    title: "Navtej Singh Johar v. Union of India (2018)",
    background: "Navtej Singh Johar, a renowned dancer, along with other prominent personalities filed a writ petition challenging the constitutional validity of Section 377 of the IPC which criminalized \"carnal intercourse against the order of nature\" - a provision primarily used to penalize homosexual relationships. This case followed the rollercoaster of previous judgments including the Delhi High Court's Naz Foundation ruling in 2009 (decriminalizing homosexuality) and Supreme Court's Suresh Kumar Koushal judgment in 2013 (re-criminalizing it).",
    legalQuestions: [
      "Does Section 377, insofar as it criminalizes consensual sexual acts between adults in private, violate the constitutional rights to dignity, privacy, equality, and freedom of expression?",
      "Should the Court overrule its previous decision in Suresh Kumar Koushal v. Naz Foundation?",
      "Is sexual orientation an integral part of identity and dignity protected by the Constitution?"
    ],
    arguments: {
      petitioners: "The petitioners argued that Section 377 violated multiple fundamental rights, including the right to privacy recently affirmed in the Puttaswamy judgment. They contended that sexual orientation was an immutable characteristic and an essential aspect of identity deserving constitutional protection.",
      respondents: "The respondents, while not strongly defending Section 377, argued that the matter involved questions of social morality that should be left to Parliament."
    },
    decision: [
      "Sexual orientation is an intrinsic element of liberty, dignity, privacy, and equality",
      "The law cannot discriminate against an individual on the basis of sexual orientation",
      "Constitutional morality must prevail over social morality",
      "Section 377 was based on stereotypes and prejudice rather than constitutional principles",
      "The Court's duty is to protect fundamental rights of minority communities, regardless of popular opinion"
    ],
    legacy: "The Navtej Johar judgment is considered revolutionary in recognizing LGBTQ+ rights in India. It established that sexual autonomy and freedom to choose one's partner are fundamental to human dignity. Beyond decriminalizing homosexuality, the judgment articulated a transformative constitutional vision that embraces diversity and condemns discrimination based on sexual orientation. It has become the foundation for further LGBTQ+ rights advocacy in India."
  },
  {
    title: "Olga Tellis v. Bombay Municipal Corporation (1985)",
    background: "In 1981, the state of Maharashtra and the Bombay Municipal Corporation decided to evict pavement dwellers and slum residents in Mumbai (then Bombay) and send them back to their places of origin. Journalist Olga Tellis, along with other journalists and organizations, filed a writ petition challenging these evictions on behalf of the pavement dwellers.",
    legalQuestions: [
      "Does the right to life under Article 21 include the right to livelihood?",
      "Do pavement dwellers have any right to encroach on public pavements?",
      "Does the procedure for eviction need to satisfy the requirement of being \"just, fair and reasonable\" under Article 21?"
    ],
    arguments: {
      petitioners: "The petitioners argued that eviction would deprive the slum dwellers of their livelihood, as they lived on pavements to be close to their places of work. They contended that the right to life included the right to livelihood, and eviction without alternative arrangements would violate Article 21.",
      respondents: "The state authorities argued that no person had the right to encroach on public property, and the evictions were necessary for urban planning and public interest."
    },
    decision: [
      "The right to life includes the right to livelihood, as no person can live without the means of living",
      "However, this right could not be construed as a license to encroach on public property",
      "The Court acknowledged that people lived on pavements not by choice but out of necessity",
      "Evictions should not be carried out during the monsoon season",
      "Those who had lived in censused slums since 1976 should be provided alternative accommodation",
      "Pavement dwellers should be given notice and reasonable time before eviction",
      "Evictions should respect principles of natural justice"
    ],
    legacy: "The Olga Tellis case is regarded as a cornerstone of socio-economic rights jurisprudence in India. It established that the right to life encompasses more than mere animal existence and includes the right to live with dignity. While it didn't prevent evictions, it laid down procedural safeguards and recognized the state's obligation to provide resettlement in certain cases. The case became a foundation for subsequent public interest litigation on housing rights, forced evictions, and urban poverty. It exemplifies the Court's attempt to balance development needs with the protection of vulnerable populations."
  }
];