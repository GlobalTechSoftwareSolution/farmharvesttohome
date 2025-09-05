import Main from '@/app/main/page'
import Philosophy from '@/app/philosophy/page'
import Ourstory from '@/app/ourstory/page'
import Whychooseus from '@/app/whychooseus/page'
import Contact from '@/app/contact/page'
import Button from '@/app/button/page'
// import Products from '@/app/products/page'

export default function Home() {
  return (
    <>
    <Main />
    <Whychooseus />
    {/* <Products /> */}
    <Ourstory />
    <Philosophy />
    <Contact />
    <Button />
    </>
  )
}
