import { useQuery } from '@apollo/client';
import Items from '../components/Items';
import Tags from '../components/Tags';
import { GET_TAGS } from '../graphql/query';
import './styles.css'

const App = () => {
  const { loading, data, refetch } = useQuery(GET_TAGS)

  return (
    <section className="main">
      <Tags loading={loading} data={data} refetch={refetch}/>
      <Items loading={loading} data={data?.getTags} refetch={refetch}/>
    </section>
  )
}

export default App
