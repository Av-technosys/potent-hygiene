import RewardReferrelOverview from '@/app/components/common/reward&ReferrelOverview'
import RewardsReferrelHeader from '@/app/components/common/rewards&ReferrelHeader'
import RewardsHistory from './rewardsHistory'

const cards =[
  {
    title:"Per Purchase",
    description:"1 Coin = ₹1"
  },
  {
    title:"Per Referrel",
    description:"100 Coins"
  }
]

const page = () => {
  return (
    <div className='flex flex-col gap-6'>
      <RewardsReferrelHeader tittle="Rewards & Security" description="Manage your rewards and account security" />
      <RewardReferrelOverview tittle="Your Reward Balance" amount="450" description="Coins" cards={cards} />
      <RewardsHistory/>
    </div>
  )
}

export default page
