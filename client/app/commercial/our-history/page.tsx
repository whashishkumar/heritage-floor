import OurHistory from '@/components/commercial/Pages/OurHistory';
import { CommercialPageData } from '@/lib/api/commercialEndPoints';


export default async function page() {
  const ourHistoryData = await CommercialPageData.getOurHistory();

  return (
    <div>
      <OurHistory ourHistoryData={ourHistoryData}/>
    </div>
  );
}
