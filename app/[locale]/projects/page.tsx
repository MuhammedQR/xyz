export const dynamic = 'force-static';

type Project = {
  title: string;
  location: string;
  year: string;
  summary: string;
};

const projects: Project[] = [
  { title: 'محطة معالجة غاز', location: 'الإمارات', year: '2023', summary: 'تصميم وتنفيذ وحدات معالجة بقدرة 150 MMSCFD.' },
  { title: 'خط أنابيب بحري', location: 'السعودية', year: '2024', summary: 'إشراف وتنفيذ أعمال مدّ أنابيب بطول 45 كم.' },
  { title: 'مستودع تخزين نفطي', location: 'عُمان', year: '2022', summary: 'أعمال التوريد والتركيب لأنظمة القياس والسلامة.' },
];

export default function ProjectsPage() {
  return (
    <section className="section">
      <div className="container-narrow">
        <h1 className="text-3xl md:text-4xl font-semibold">المشاريع</h1>
        <div className="grid gap-6 mt-6">
          {projects.map((p) => (
            <div key={p.title} className="card">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <div className="text-sm text-white/70">{p.location} • {p.year}</div>
              </div>
              <p className="mt-2 text-white/80">{p.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
