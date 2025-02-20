import {SendCard} from "../../../components/SendCard";
import { getOnRampTransactions } from "../../lib/actions/getP2pTransfers";
import { P2PTransaction } from "../../../components/P2PTransaction";


export default async function() {
    const transaction=await getOnRampTransactions();
    return <div className="flex flex-col md:flex-row items-start justify-center gap-6 p-6">
        <div className="flex-1 max-w-md w-full">
            <SendCard />
        </div>
        <div>
            <div className="flex-1 max-w-md w-full">
                <P2PTransaction transactions={transaction} />
                {/* <OnRampTransactions transactions={transactions} /> */}
            </div>
        </div>
    </div>
}
