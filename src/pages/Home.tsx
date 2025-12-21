import Hero from '@/components/Hero'
import Showroom from '@/components/Showroom'
import Diensten from './Diensten'
import Aanpak from './Aanpak'
import WaaromWij from './WaaromWij'
import Contact from './Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Showroom />
      <Diensten />
      <Aanpak />
      <WaaromWij />
      <Contact />
    </>
  )
}
