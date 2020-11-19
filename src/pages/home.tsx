import { GetStaticProps } from 'next'
import Link from 'next/link'
import github from '../services/github';

export default function Home({ name, bio, avatar_url }) {
  return (
    <div>
      <main>
        <img src={avatar_url} alt="Foto de perfil" style={{borderRadius: 50, width: 50}} />
        <h1>{name}</h1>
        <p>{bio}</p>
        <Link href={'/repos'}>
          <a>Repositórios</a>
        </Link>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await github.get('/thcarvalho')
  return {
    props: response.data
  }
}