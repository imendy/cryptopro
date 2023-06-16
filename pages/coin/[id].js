import Header from '../../components/Header';
import { useRouter } from 'next/router';
import CoinDetail from '../../components/CoinDetail';



function CoinId() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
       <Header />

    <CoinDetail coinId={id} />
    </div>

    
  ) 
}

export default CoinId;

