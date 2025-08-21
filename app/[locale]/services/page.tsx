export const dynamic = 'force-static';

const services = [
  {
    title: 'هندسة وتصميم المنشآت',
    desc: 'دراسات هندسية وتصميم تفصيلي لمنشآت النفط والغاز، مع اختيار مواد ومعدات مطابقة للمعايير.',
  },
  {
    title: 'إدارة المشاريع والتشغيل والصيانة',
    desc: 'إدارة دورة حياة المشروع من التخطيط والتنفيذ إلى التشغيل والصيانة الدورية والتدخلات التصحيحية.',
  },
  {
    title: 'السلامة والامتثال HSE',
    desc: 'أنظمة إدارة السلامة، تقييم المخاطر، إجراءات الطوارئ، والتدريب المستمر للفرق.',
  },
  {
    title: 'الخدمات اللوجستية وسلاسل الإمداد',
    desc: 'توريد، تخزين، وشحن المعدات والمواد وفق أفضل الممارسات لضمان الاستمرارية.',
  },
];

export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container-narrow">
        <h1 className="text-3xl md:text-4xl font-semibold">الخدمات</h1>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {services.map((s) => (
            <div key={s.title} className="card">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/80">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
