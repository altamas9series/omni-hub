import { siteContent } from "@/data/content";

const { comparison } = siteContent;

export function ComparisonSection() {
  return (
    <section className="section-padding relative bg-card/30">
      <div className="container px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {comparison.title}
            <span className="gradient-text"> {comparison.titleAccent}</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {comparison.headers.map((h, i) => (
                  <th
                    key={h}
                    className={`py-4 px-4 font-semibold ${
                      i === 0 ? "text-left" : "text-center"
                    } ${
                      i === comparison.headers.length - 1
                        ? "text-gradient"
                        : "text-muted-foreground"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <td className="py-4 px-4 font-medium">{row.feature}</td>
                  {row.values.map((val, i) => (
                    <td
                      key={i}
                      className={`py-4 px-4 text-center ${
                        i === row.values.length - 1 ? "" : "text-muted-foreground"
                      }`}
                    >
                      {i === row.values.length - 1 ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                          {val}
                        </span>
                      ) : (
                        val
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
