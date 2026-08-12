import { ProjectMediaFigure } from '@/components/ProjectMediaFigure'

type ProjectShotProps = {
  src: string
  alt?: string
  caption?: string
}

/** Inline image for project MDX: <ProjectShot src="/projects/Logr/dashboard.png" caption="..." /> */
export const ProjectShot = ({ src, alt, caption }: ProjectShotProps) => (
  <ProjectMediaFigure asset={{ asset: { url: src }, description: alt }} caption={caption} />
)
