import { Note } from "@/types/note";

export const INITIAL_NOTES: Note[] = [
  {
    id: "stoic-dichotomy",
    title: "The Dichotomy of Control",
    content: `Stoic philosophy rests on a fundamental boundary: distinguishing between what is up to us and what is not up to us. Epictetus argued that true tranquility and mental freedom come from focusing exclusively on our own judgments, impulses, and desires, while completely detaching our emotional well-being from external outcomes like wealth, reputation, or the actions of others.

When we expend mental energy trying to control external events, we experience chronic anxiety and frustration. By redirecting that energy inward toward our character, preparation, and response, we reclaim agency over our lives. This principle is not passive resignation; rather, it is energetic focus on the only arena where we can actually make a difference. As Marcus Aurelius noted in his journals, you have power over your mind—not outside events. Realize this, and you will find strength.`,
    tags: ["philosophy", "stoicism", "mindset"],
    folder: "philosophy",
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "deep-work-focus",
    title: "Deep Work and Cognitive Capital",
    content: `Deep work is the ability to focus without distraction on a cognitively demanding task. It produces elite value, creates genuine mastery, and is increasingly rare in a world dominated by Slack notifications, endless email, and social media switching.

Cal Newport distinguishes between deep work and shallow work. While shallow work is non-cognitive, logistical tasks performed while distracted, deep work pushes your cognitive capabilities to their absolute limit. To cultivate deep work, one must establish rigorous rituals: setting clear time blocks with zero digital interruptions, designing a distraction-free workspace, and scheduling regular periods of complete digital disconnection. In an economy where cognitive capital determines who thrives, the ability to dive deep for hours on end is a superpower. Connected to [[Atomic Notes]] for capturing insights during focus sessions.`,
    tags: ["productivity", "focus", "habits"],
    folder: "productivity",
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "mental-models-latticework",
    title: "Latticework of Mental Models",
    content: `Charlie Munger famously advocated for acquiring multiple mental models from different academic disciplines—psychology, biology, physics, economics, and history—and organizing them into a latticework in your mind.

If you only have a hammer, every problem looks like a nail. But when you possess a multidisciplinary toolkit of models like compound interest, second-order thinking, cognitive biases, incentives, and entropy, you can analyze complex problems from multiple angles. For instance, understanding biological evolution helps explain how software architectures evolve over time through iterative refactoring and natural selection of patterns. Building this mental latticework requires lifelong reading and active synthesis across disparate domains.`,
    tags: ["general", "thinking", "learning"],
    folder: "learning",
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "atomic-notes",
    title: "Atomic Notes and Knowledge Graphs",
    content: `An atomic note is a self-contained, indivisible unit of knowledge focused on a single, well-defined idea. Unlike traditional long-form notes that pile up in hierarchical folders where information goes to die, atomic notes are designed to be linked together, recombined, and revisited over time.

Each note should contain one primary concept written in your own words, accompanied by clear [[Zettelkasten]] references and relevant tags. When notes are kept short and modular, they act like building blocks. Over months and years, your personal knowledge graph becomes an emergent network of interconnected insights, allowing serendipitous connections to form naturally between ideas from completely different domains.`,
    tags: ["productivity", "zettelkasten", "notes"],
    folder: "knowledge",
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: "second-order-thinking",
    title: "Second-Order Thinking",
    content: `First-order thinking is simplistic and reactive: "If we do X, what will the immediate consequence be?" Second-order thinking is deep and systemic: "And then what? What are the downstream ripple effects and long-term feedback loops?"

Most people and organizations stop at first-order consequences because second-order thinking requires cognitive effort and foresight. For example, lowering prices might boost immediate sales (first-order), but it can also degrade brand perception, attract price-sensitive customers who churn quickly, and start a destructive race to the bottom with competitors (second-order). Cultivating the habit of asking "And then what?" three times before making important decisions prevents short-term wins from turning into long-term strategic disasters.`,
    tags: ["philosophy", "strategy", "decision-making"],
    folder: "philosophy",
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "zettelkasten",
    title: "The Zettelkasten Method",
    content: `Invented by sociologist Niklas Luhmann—who published over 70 books and 400 articles using this exact system—the Zettelkasten is a slip-box method for notes and literature management.

The workflow consists of fleeting notes (quick capture of passing thoughts), literature notes (summaries of books and articles in your own words), and permanent notes (atomic, permanent concepts stored with unique identifiers and rich bidirectional links). By decoupling note-taking from rigid hierarchical filing systems and relying entirely on a web of connections, Luhmann transformed his slip-box into a conversational sparring partner that actively generated new research directions and essay outlines for him.`,
    tags: ["productivity", "zettelkasten", "research"],
    folder: "knowledge",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "network-effects",
    title: "Network Effects and Value Creation",
    content: `A network effect occurs when a product or service becomes more valuable as more people use it. Unlike traditional businesses that benefit from economies of scale on the supply side, network-enabled platforms benefit from demand-side economies of scale.

Classic examples include telecommunication networks, marketplaces, and developer ecosystems. In two-sided networks, each new user adds liquidity and variety for users on the other side, creating a powerful compounding moat. Understanding network dynamics is crucial not just for economics and startup strategy, but also for personal knowledge management: the more interconnected your [[Atomic Notes]] become, the more valuable your personal second brain grows over time.`,
    tags: ["general", "economics", "strategy"],
    folder: "learning",
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
  },
  {
    id: "habit-loops",
    title: "The Habit Loop: Cue, Routine, Reward",
    content: `According to behavioral research popularized by Charles Duhigg and James Clear, every habit operates in a neurological loop consisting of four stages: cue, craving, response, and reward.

The cue triggers the brain to initiate a behavior; the craving is the motivational force behind every habit; the response is the actual habit performed (thought or action); and the reward is the end goal that satisfies the craving and reinforces the neural pathway. To build positive habits, make the cue obvious, the routine easy, and the reward satisfying. Conversely, to break bad habits, invert these laws: make cues invisible, routines difficult, and consequences unsatisfying. Understanding this loop transforms personal development from sheer willpower into clever environmental design.`,
    tags: ["self-improvement", "habits", "psychology"],
    folder: "productivity",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600000).toISOString(),
  },
  {
    id: "memento-mori",
    title: "Memento Mori and Perspective",
    content: `Memento Mori is the ancient Latin reminder that "you must die." While modern culture often treats death as a taboo topic to be avoided, Roman Stoics meditated on mortality daily to calibrate what actually matters in life.

When confronted with petty conflicts, ego slights, or overwhelming trivial tasks, remembering our finite lifespan acts as an immediate acid test for priority. If today were your last week on earth, would you spend it worrying about an email typo or holding a grudge? Memento Mori is not morbid pessimism; it is a profound catalyst for gratitude and radical presence. It strips away the superficial noise so you can invest your limited days into deep work, meaningful relationships, and genuine creation.`,
    tags: ["philosophy", "stoicism", "mindset"],
    folder: "philosophy",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  {
    id: "learning-in-public",
    title: "Learning in Public",
    content: `Learning in public is the antidote to the perfectionist trap of waiting until you know everything before sharing anything. By documenting your learning journey, mistakes, and discoveries openly, you transform yourself from an isolated consumer into an active contributor.

Sharing what you learn attracts serendipity: mentors find you, collaborators reach out, and peers facing similar challenges share insights. Furthermore, attempting to explain a complex topic simply forces you to confront the gaps in your own understanding—proving Richard Feynman's famous adage that if you cannot explain something simply, you don't understand it well enough.`,
    tags: ["self-improvement", "learning", "productivity"],
    folder: "knowledge",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
