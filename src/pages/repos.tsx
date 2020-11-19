import { GetStaticPaths, GetStaticProps } from "next"
import Link from 'next/link'
import github from '../services/github';

interface IRepoProps {
  repos: [
    {
      id: number,
      name: string,
      description: string,
      language: string
    }
  ]
}

export default function Repos({ repos }: IRepoProps) {
  if (!repos) {
    return <p>Carregando ...</p>
  }

  return (
    <div>
      <ul>
        {
          repos.map(repo => (
            <li key={repo.id}>
              <h3>{repo.name}</h3>
              <Link href={`/repos/${repo.name}`}>
                <a>Detalhes</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await github.get('/thcarvalho/repos')
  return {
    props: { repos: response.data }
  }
}