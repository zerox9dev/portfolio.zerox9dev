import { ProjectMediaFigure } from '@/components/ProjectMediaFigure'

type Shot = {
  src: string
  alt?: string
  caption?: string
}

type ProjectShotRowProps = {
  shots?: Shot[]
  /** Convenience props so MDX can stay flat: <ProjectShotRow src1="…" src2="…" /> */
  src1?: string
  caption1?: string
  src2?: string
  caption2?: string
}

/** Two detail shots side by side (stacked on mobile). */
export const ProjectShotRow = ({
  shots,
  src1,
  caption1,
  src2,
  caption2,
}: ProjectShotRowProps) => {
  const items: Shot[] =
    shots ??
    ([
      src1 ? { src: src1, caption: caption1 } : null,
      src2 ? { src: src2, caption: caption2 } : null,
    ].filter(Boolean) as Shot[])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="my-6 grid grid-cols-2 gap-3">
      {items.map((item, index) => (
        <ProjectMediaFigure
          key={index}
          asset={{ asset: { url: item.src }, description: item.alt }}
          caption={item.caption}
          wide={false}
          className="my-0"
        />
      ))}
    </div>
  )
}
