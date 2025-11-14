import { Header } from '../components/Header';
import { PaymentsTable } from '../components/paymentsTable/PaymentsTable';


export const DashboardPage = () => {
  return (
    <section className='flex flex-col gap-y-[40px]'>
      <Header/>
      <div className='flex flex-col gap-y-[24px]'>
        <div className='flex flex-col gap-y-[8px]'>
          <h2 >Your Recurring Payments</h2>
          <span>This dashboard displays all your saved recurring payments. You can add new payments, edit existing ones, or delete them as needed. The summary chart provides a visual breakdown of your payments by frequency.</span>
        </div>
        <PaymentsTable/>
      </div>
    </section>
  );
};