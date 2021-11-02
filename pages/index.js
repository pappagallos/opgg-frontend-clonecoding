import { useSelector } from 'react-redux';
import OPGGHeader from '../components/OPGGHeader/OPGGHeader';
import OPGGSummonerBody from '../components/OPGGSummonerBody/OPGGSummonerBody';
import OPGGSummonerHeader from '../components/OPGGSummonerHeader/OPGGSummonerHeader';

export default function Home() {
  const stateSummoner = useSelector(state => state.summoner);

  return (
    <>
      <OPGGHeader />
      { 
      (stateSummoner && stateSummoner.summoner.name) && 
        <>
          <OPGGSummonerHeader />
          <OPGGSummonerBody /> 
        </>
      }
    </>
  )
}
