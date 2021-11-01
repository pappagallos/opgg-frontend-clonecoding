import OPGGHeader from '../components/OPGGHeader/OPGGHeader';
import OPGGSummonerBody from '../components/OPGGSummonerBody/OPGGSummonerBody';
import OPGGSummonerHeader from '../components/OPGGSummonerHeader/OPGGSummonerHeader';

export default function Home() {
  return (
    <>
      <OPGGHeader />
      <OPGGSummonerHeader />
      <OPGGSummonerBody />
    </>
  )
}
