import { Card } from "@repo/ui/card"

export const P2PTransaction = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        to: string | null | undefined,
    }[]
}) => {
    if (!transactions.length) {
        console.log(transactions)
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    console.log(transactions)
    
    return <Card title="Recent Transactions">
        
        <div className="pt-2">
            {transactions.map((t,idx) => <div key={idx} className="flex justify-between border-b py-2">
                <div>
                    <div className="text-sm">
                        Send PKR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    - Rs {t.amount / 100}
                </div>
                <div className="flex flex-col justify-center">
                    - {t.to}
                </div>

            </div>)}
        </div>
    </Card>
}
// enum status{
//     Success,
//     Failure,
//     Processing
// }