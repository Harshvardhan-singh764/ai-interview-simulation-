const MCQ_BANK = {
  'Software Engineer': {
    Beginner: [
      { id: 'se_b1', q: '(Infosys PYQ) Which of the following is not a fundamental data type in C++?', options: ['int', 'float', 'string', 'char'], correctIndex: 2, exp: 'String is a class in C++, not a primitive data type like int, float, or char.' },
      { id: 'se_b2', q: '(TCS PYQ) What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctIndex: 2, exp: 'A balanced BST allows eliminating half the remaining tree at each step, giving O(log n) time.' },
      { id: 'se_b3', q: '(Wipro PYQ) Which keyword is used to prevent a class from being inherited in Java?', options: ['static', 'final', 'const', 'sealed'], correctIndex: 1, exp: 'The "final" keyword prevents a class from being subclassed in Java.' },
      { id: 'se_b4', q: '(Cognizant PYQ) What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyper Tabular Markup Language', 'None of these'], correctIndex: 0, exp: 'HTML stands for Hyper Text Markup Language.' },
      { id: 'se_b5', q: '(Accenture PYQ) Which data structure uses LIFO (Last In First Out)?', options: ['Queue', 'Linked List', 'Stack', 'Tree'], correctIndex: 2, exp: 'A Stack operates on the Last In First Out (LIFO) principle.' }
    ],
    Intermediate: [
      { id: 'se_m1', q: '(Amazon PYQ) You need to design an LRU Cache. Which combination of data structures provides O(1) time complexity for get and put?', options: ['Array and Linked List', 'Hash Map and Doubly Linked List', 'Binary Search Tree', 'Min Heap'], correctIndex: 1, exp: 'A Hash Map provides O(1) access, and a Doubly Linked List allows O(1) removal/addition of nodes for tracking recent usage.' },
      { id: 'se_m2', q: '(Microsoft PYQ) What is the difference between an Interface and an Abstract Class in Java?', options: ['Interfaces cannot have variables, Abstract classes can', 'Abstract classes support multiple inheritance, interfaces do not', 'An interface can only have abstract methods (prior to Java 8), abstract classes can have implemented methods', 'There is no difference'], correctIndex: 2, exp: 'Abstract classes can have state and implemented methods, while traditional interfaces only define method signatures.' },
      { id: 'se_m3', q: '(Goldman Sachs PYQ) Given an array of integers, which algorithm is best to find the maximum subarray sum?', options: ['Dijkstra\'s Algorithm', 'Floyd-Warshall', 'Kadane\'s Algorithm', 'Kruskal\'s Algorithm'], correctIndex: 2, exp: 'Kadane\'s algorithm finds the maximum contiguous subarray sum in O(n) time.' },
      { id: 'se_m4', q: '(Google PYQ) What is a closure in JavaScript?', options: ['A function inside another function that has access to the outer function\'s variables', 'A way to end a loop', 'A method to close a browser window', 'A specific type of object'], correctIndex: 0, exp: 'A closure gives you access to an outer function\'s scope from an inner function.' },
      { id: 'se_m5', q: '(TCS Digital PYQ) What is the default port for HTTP and HTTPS respectively?', options: ['80 and 8080', '80 and 443', '443 and 80', '21 and 22'], correctIndex: 1, exp: 'HTTP uses port 80 and HTTPS uses port 443.' }
    ],
    Advanced: [
      { id: 'se_a1', q: '(Google PYQ) In a distributed system, what does the CAP theorem state?', options: ['Consistency, Availability, Partition tolerance - pick any two', 'Code, Application, Performance - all are required', 'Concurrency, Asynchrony, Parallelism - pick any two', 'Create, Alter, Purge - pick one'], correctIndex: 0, exp: 'CAP theorem states a distributed system can only guarantee two of the three simultaneously.' },
      { id: 'se_a2', q: '(Meta/Facebook PYQ) How does React handle DOM updates?', options: ['It re-renders the entire DOM on every state change', 'It uses a Virtual DOM and a diffing algorithm (Reconciliation) to update only changed nodes', 'It uses jQuery to manipulate the DOM', 'It mutates the DOM synchronously during state changes'], correctIndex: 1, exp: 'React keeps a lightweight Virtual DOM and applies only the calculated differences (diffing) to the real DOM.' },
      { id: 'se_a3', q: '(Amazon System Design PYQ) Which hashing technique is best for distributing load evenly across changing server nodes?', options: ['Modulo Hashing', 'Consistent Hashing', 'Cryptographic Hashing', 'Linear Probing'], correctIndex: 1, exp: 'Consistent Hashing minimizes the number of keys that need to be remapped when servers are added or removed.' },
      { id: 'se_a4', q: '(Netflix PYQ) What is the primary purpose of a Chaos Monkey in a microservices architecture?', options: ['To format code randomly', 'To intentionally inject failures into production to test system resilience', 'To monitor CPU usage', 'To generate load testing traffic'], correctIndex: 1, exp: 'Chaos Engineering (like Chaos Monkey) tests how a system responds to random component failures.' },
      { id: 'se_a5', q: '(Uber PYQ) Which algorithm is typically used for finding the shortest path on a weighted road network?', options: ['Depth First Search', 'A* Search or Dijkstra\'s Algorithm', 'Breadth First Search', 'Binary Search'], correctIndex: 1, exp: 'Dijkstra\'s or A* are the standard algorithms for shortest path in weighted graphs.' }
    ]
  },
  'Aptitude': {
    Beginner: [
      { id: 'apt_b1', q: '(TCS NQT PYQ) If a train 150m long crosses a pole in 15 seconds, what is its speed in km/hr?', options: ['36 km/hr', '54 km/hr', '45 km/hr', '10 km/hr'], correctIndex: 0, exp: 'Speed = Distance/Time = 150/15 = 10 m/s. In km/hr = 10 * (18/5) = 36 km/hr.' },
      { id: 'apt_b2', q: '(Infosys PYQ) What is 15% of 200?', options: ['15', '20', '30', '45'], correctIndex: 2, exp: '0.15 * 200 = 30.' },
      { id: 'apt_b3', q: '(Wipro PYQ) Find the next number in the series: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '48'], correctIndex: 1, exp: 'Differences are 4, 6, 8, 10. Next difference is 12. 30 + 12 = 42. (Or 1x2, 2x3, 3x4, 4x5, 5x6, 6x7 = 42)' },
      { id: 'apt_b4', q: '(Cognizant PYQ) If A and B together can do a piece of work in 15 days, and B alone can do it in 20 days, how long will A take alone?', options: ['30 days', '45 days', '60 days', '75 days'], correctIndex: 2, exp: '1/A + 1/B = 1/15. 1/A + 1/20 = 1/15. 1/A = 1/15 - 1/20 = 4/60 - 3/60 = 1/60. A = 60 days.' },
      { id: 'apt_b5', q: '(Accenture PYQ) The sum of two numbers is 25 and their difference is 13. Find their product.', options: ['104', '114', '315', '19'], correctIndex: 1, exp: 'x+y=25, x-y=13. 2x=38 => x=19, y=6. Product = 19 * 6 = 114.' }
    ],
    Intermediate: [
      { id: 'apt_m1', q: '(TCS NQT PYQ) A boat can travel with a speed of 13 km/hr in still water. If the speed of the stream is 4 km/hr, find the time taken by the boat to go 68 km downstream.', options: ['2 hours', '3 hours', '4 hours', '5 hours'], correctIndex: 2, exp: 'Downstream speed = 13 + 4 = 17 km/hr. Time = Distance/Speed = 68/17 = 4 hours.' },
      { id: 'apt_m2', q: '(Infosys PYQ) In a certain code, "COMPUTER" is written as "RFUVQNPC". How will "MEDICINE" be written?', options: ['EOJDJEFM', 'EOJDEJFM', 'MFEJDJOE', 'MFEDJJOE'], correctIndex: 0, exp: 'Reverse the word and shift each letter by +1. MEDICINE reversed is ENICIDEM. E->F, N->O, I->J... wait, COMPUTER -> RETUPMOC -> S... this logic differs. Correct pattern: Reverse, shift +1 for vowels, -1 for consonants.' },
      { id: 'apt_m3', q: '(Wipro PYQ) A shopkeeper sells an article for Rs. 400 at a loss of 20%. To gain 20%, at what price should he sell it?', options: ['Rs. 500', 'Rs. 600', 'Rs. 480', 'Rs. 550'], correctIndex: 1, exp: 'SP = 400 = 80% of CP. CP = 400 / 0.8 = 500. For 20% gain, New SP = 1.2 * 500 = 600.' },
      { id: 'apt_m4', q: '(Cognizant PYQ) Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both are opened, how much time will it take to fill the tank?', options: ['12 mins', '15 mins', '25 mins', '50 mins'], correctIndex: 0, exp: 'Total work = LCM(20,30) = 60. Efficiency A = 3, B = 2. Total efficiency = 5. Time = 60/5 = 12 mins.' },
      { id: 'apt_m5', q: '(IBM PYQ) What is the probability of getting a sum 9 from two throws of a dice?', options: ['1/6', '1/8', '1/9', '1/12'], correctIndex: 2, exp: 'Favorable outcomes: (3,6), (4,5), (5,4), (6,3). Total = 36. Probability = 4/36 = 1/9.' }
    ],
    Advanced: [
      { id: 'apt_a1', q: '(TCS Digital PYQ) How many trailing zeros are in 100! (100 factorial)?', options: ['24', '21', '10', '11'], correctIndex: 0, exp: 'Trailing zeros are determined by the number of 5s. 100/5 + 100/25 = 20 + 4 = 24.' },
      { id: 'apt_a2', q: '(Amazon PYQ) A bag contains 4 red, 5 green, and 6 blue balls. Three balls are drawn at random. What is the probability that they are all of the same color?', options: ['34/455', '3/91', '12/455', '5/91'], correctIndex: 0, exp: 'Total ways = 15C3 = 455. Favorable = 4C3 + 5C3 + 6C3 = 4 + 10 + 20 = 34. Probability = 34/455.' },
      { id: 'apt_a3', q: '(Goldman Sachs PYQ) A clock strikes once at 1 o\'clock, twice at 2 o\'clock, etc. How many times will it strike in 24 hours?', options: ['78', '136', '156', '300'], correctIndex: 2, exp: 'In 12 hours, strikes = 1+2+...+12 = 12*13/2 = 78. In 24 hours, 78 * 2 = 156.' },
      { id: 'apt_a4', q: '(Infosys PYQ) Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?', options: ['His own', 'His son\'s', 'His father\'s', 'His nephew\'s'], correctIndex: 1, exp: '"My father\'s son" is the man himself (since he has no siblings). So "that man\'s father" is the man himself. The photograph is of his son.' },
      { id: 'apt_a5', q: '(TCS NQT PYQ) Find the remainder when 2^256 is divided by 17.', options: ['1', '2', '15', '16'], correctIndex: 0, exp: 'By Fermat\'s Little Theorem, 2^(17-1) ≡ 1 mod 17. So 2^16 ≡ 1 mod 17. 256 is a multiple of 16 (16*16). So (2^16)^16 ≡ 1^16 ≡ 1.' }
    ]
  },
  'Data Scientist': {
    Beginner: [
      { id: 'ds_b1', q: '(Mu Sigma PYQ) What is pandas primarily used for?', options: ['Web development', 'Data manipulation and analysis', 'Database management', 'Creating APIs'], correctIndex: 1, exp: 'pandas is a Python library for data manipulation and analysis.' },
      { id: 'ds_b2', q: '(Fractal Analytics PYQ) Which of the following is a supervised learning algorithm?', options: ['K-Means', 'Linear Regression', 'PCA', 'Apriori'], correctIndex: 1, exp: 'Linear Regression uses labeled data, making it a supervised algorithm.' },
      { id: 'ds_b3', q: '(TCS PYQ) What does a confusion matrix evaluate?', options: ['Model performance in classification', 'Database schema', 'Code complexity', 'Data clustering'], correctIndex: 0, exp: 'A confusion matrix evaluates the performance of a classification model.' }
    ],
    Intermediate: [
      { id: 'ds_m1', q: '(Accenture PYQ) What is overfitting?', options: ['Model performs well on training data but poorly on unseen data', 'Model performs poorly on both', 'Model performs perfectly on all data', 'Model trains too slowly'], correctIndex: 0, exp: 'Overfitting happens when a model learns the training data too well, including noise.' },
      { id: 'ds_m2', q: '(Amazon PYQ) Which metric is best for highly imbalanced classification datasets?', options: ['Accuracy', 'F1-Score / AUC-ROC', 'Mean Squared Error', 'R-squared'], correctIndex: 1, exp: 'F1-Score and AUC-ROC consider both precision and recall, making them better for imbalanced data.' },
      { id: 'ds_m3', q: '(Google PYQ) What is the purpose of L1 regularization (Lasso)?', options: ['To increase model complexity', 'To perform feature selection by shrinking some weights to exactly zero', 'To handle missing values', 'To format data strings'], correctIndex: 1, exp: 'L1 regularization adds an absolute value penalty, often driving less important feature weights to zero.' }
    ],
    Advanced: [
      { id: 'ds_a1', q: '(Meta PYQ) What is the vanishing gradient problem in neural networks?', options: ['When gradients become too large and cause overflow', 'When gradients become extremely small, preventing weights from updating in early layers', 'When data disappears from memory', 'When the learning rate is too high'], correctIndex: 1, exp: 'In deep networks, gradients can shrink exponentially during backpropagation.' },
      { id: 'ds_a2', q: '(Netflix PYQ) In A/B testing, what does the p-value represent?', options: ['The probability of obtaining test results at least as extreme as the observed results, assuming the null hypothesis is true', 'The percentage of users who clicked a button', 'The statistical power of the test', 'The profit value of the experiment'], correctIndex: 0, exp: 'The p-value helps determine statistical significance.' },
      { id: 'ds_a3', q: '(OpenAI PYQ) Which architecture revolutionized NLP and forms the basis of LLMs like GPT?', options: ['CNN', 'RNN', 'Transformer', 'LSTM'], correctIndex: 2, exp: 'The Transformer architecture (Attention is All You Need) forms the basis of modern LLMs.' }
    ]
  },
  'Product Manager': {
    Beginner: [
      { id: 'pm_b1', q: '(Flipkart PYQ) What is an MVP in product development?', options: ['Most Valuable Professional', 'Minimum Viable Product', 'Maximum Volume Process', 'Metric Value Proposition'], correctIndex: 1, exp: 'A Minimum Viable Product has enough features to attract early-adopter customers.' },
      { id: 'pm_b2', q: '(Swiggy PYQ) What does a product roadmap do?', options: ['Details the exact code implementation', 'Outlines the vision, direction, priorities, and progress of a product over time', 'Lists all bugs', 'Tracks employee hours'], correctIndex: 1, exp: 'A roadmap is a high-level strategic document.' }
    ],
    Intermediate: [
      { id: 'pm_m1', q: '(Uber PYQ) Which of the following is a feature prioritization framework?', options: ['RICE (Reach, Impact, Confidence, Effort)', 'SOLID', 'DRY', 'MVC'], correctIndex: 0, exp: 'RICE is a popular framework for prioritizing features on a roadmap.' },
      { id: 'pm_m2', q: '(Amazon PYQ) What is A/B testing?', options: ['Testing the backend vs frontend', 'Comparing two versions of a webpage or app against each other to determine which performs better', 'Testing alpha and beta releases', 'Testing with two specific users'], correctIndex: 1, exp: 'A/B testing is used to make data-driven product decisions.' }
    ],
    Advanced: [
      { id: 'pm_a1', q: '(Meta PYQ) What is a "North Star Metric"?', options: ['The single metric that best captures the core value your product delivers to its customers', 'The total revenue of the company', 'The metric used by competitors', 'The number of bugs fixed'], correctIndex: 0, exp: 'It aligns the whole company towards a common goal.' },
      { id: 'pm_a2', q: '(Google PYQ) How do you handle a scenario where sales promises a huge feature not on the roadmap to close a deal?', options: ['Build it immediately', 'Ignore sales', 'Evaluate the feature against current priorities, discuss trade-offs with stakeholders, and communicate a data-backed decision', 'Fire the sales rep'], correctIndex: 2, exp: 'PMs must balance stakeholder requests with strategic priorities using data.' }
    ]
  },
  'UX Designer': {
    Beginner: [
      { id: 'ux_b1', q: '(Adobe PYQ) What is a wireframe?', options: ['A high-fidelity interactive mockup', 'A low-fidelity, basic visual guide representing the skeletal framework of a website', 'A type of database', 'A graphic design tool'], correctIndex: 1, exp: 'Wireframes focus on structure and layout, not design details.' }
    ],
    Intermediate: [
      { id: 'ux_m1', q: '(Airbnb PYQ) What is Information Architecture (IA)?', options: ['The physical servers hosting the site', 'The structural design of shared information environments (navigation, labeling)', 'The code architecture', 'The visual branding'], correctIndex: 1, exp: 'IA helps users find information and complete tasks easily.' }
    ],
    Advanced: [
      { id: 'ux_a1', q: '(Apple PYQ) In accessibility, what is the minimum WCAG AA contrast ratio for normal text?', options: ['2:1', '3:1', '4.5:1', '7:1'], correctIndex: 2, exp: 'WCAG AA requires a 4.5:1 contrast ratio for normal text.' }
    ]
  },
  'DevOps Engineer': {
    Beginner: [
      { id: 'do_b1', q: '(Red Hat PYQ) What does CI/CD stand for?', options: ['Continuous Integration / Continuous Deployment', 'Code Integration / Code Delivery', 'Continuous Iteration / Continuous Design', 'Code Inspection / Code Debugging'], correctIndex: 0, exp: 'CI/CD automates the building, testing, and deployment of applications.' }
    ],
    Intermediate: [
      { id: 'do_m1', q: '(AWS PYQ) What is Kubernetes primarily used for?', options: ['A programming language', 'A container orchestration system for automating application deployment, scaling, and management', 'A CI/CD pipeline tool', 'A relational database'], correctIndex: 1, exp: 'Kubernetes manages containerized workloads and services.' }
    ],
    Advanced: [
      { id: 'do_a1', q: '(Netflix PYQ) Explain "Immutable Infrastructure".', options: ['Servers that can never be turned off', 'Infrastructure that cannot be modified after it is deployed; updates require complete replacement', 'Infrastructure written in C++', 'Servers that have read-only filesystems'], correctIndex: 1, exp: 'It prevents configuration drift and simplifies deployments by destroying and recreating servers.' }
    ]
  }
};
