import {
  useParams
} from 'react-router-dom';

const MovePage = () => {
  let params = useParams();

  return (
    <div>
      This is a move page for {params.moveId}.
    </div>
  )
}

export default MovePage;