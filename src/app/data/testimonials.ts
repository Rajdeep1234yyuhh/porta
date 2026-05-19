export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text?: string;
  date: string;
  initial: string;
  avatarColor: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Suresh Kumar",
    role: "Owner · Dhiti.ai",
    rating: 5,
    text: "Rajdeep is an exceptionally talented developer with a strong blend of creativity, technical expertise, and problem-solving ability. His attention to detail in UI/UX design and dedication toward building high-quality products truly stand out.",
    date: "2 weeks ago",
    initial: "S",
    avatarColor: "#4285F4",
  },
  {
    id: "2",
    name: "Himani Minocha",
    role: "Owner · Homebagh",
    rating: 5,
    text: "He is great to work with, extremely talented and always available.",
    date: "1 week ago",
    initial: "H",
    avatarColor: "#EA4335",
  },
  {
    id: "3",
    name: "Akshita Sharma",
    role: "Owner · Aekay",
    rating: 5,
    text: "Got my Shopify website made by Rajdeep. Excellent work and smooth process.",
    date: "1 week ago",
    initial: "A",
    avatarColor: "#34A853",
  },
  {
    id: "4",
    name: "Ankush Pahuja",
    role: "Google Reviewer",
    rating: 5,
    text: "He is one of the best developers I know. You should hire him for website services.",
    date: "4 days ago",
    initial: "A",
    avatarColor: "#FF5722",
  },
  {
    id: "5",
    name: "Mongkyao Mog",
    role: "Local Guide",
    rating: 5,
    text: "He knows his stuff properly and easy to work with too.",
    date: "5 days ago",
    initial: "M",
    avatarColor: "#FBBC05",
  },
  {
    id: "6",
    name: "Rishabh Saikia",
    role: "Local Guide",
    rating: 5,
    date: "1 week ago",
    initial: "R",
    avatarColor: "#9C27B0",
  },
  {
    id: "7",
    name: "Bloomweb",
    role: "Business",
    rating: 5,
    text: "We have collaborated with him on multiple projects. The work done by him is on time. He is a very dedicated developer.",
    date: "just now",
    initial: "B",
    avatarColor: "#00BCD4",
  },
  {
    id: "8",
    name: "Annyana Annie",
    role: "Google Reviewer",
    rating: 5,
    date: "2 weeks ago",
    initial: "A",
    avatarColor: "#E91E63",
  },
  {
    id: "9",
    name: "Anup Borah",
    role: "Google Reviewer",
    rating: 5,
    text: "Great developer to work with. Very skilled technically, communicates well, and the project is going very smoothly. Really happy with the progress and quality of work so far.",
    date: "just now",
    initial: "A",
    avatarColor: "#009688",
  },
];
