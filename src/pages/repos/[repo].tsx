import { GetStaticPaths, GetStaticProps } from 'next'
import github from '../../services/github';

export default function Repo({ repo }) {
  if (!repo) {
    return <p>Carregando...</p>
  }
  
  return (
    <div>
      <h2>{repo[0].name}</h2>
      <p>{repo[0].description}</p>
      <strong>{repo[0].language}</strong>
    </div>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  const response = await github.get('/thcarvalho/repos')
  const paths = response.data.map(repo => {
    return {
      params: {
        repo: repo.name
      }
    }
  })  

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { repo } = context.params

  const response = await github.get('/thcarvalho/repos')
  const singleRepo = response.data.filter(repository => {
    if (repository.name === repo) {
      return repository;
    }
  })


  return {
    props: {
      repo: singleRepo
    }
  }
}