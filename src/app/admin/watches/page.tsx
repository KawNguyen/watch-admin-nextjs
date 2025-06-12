import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import WatchesDataTable from "./_components/watches-data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function WatchesPage() {
    return <Card>
        <CardHeader>
            <div className="w-full flex items-center justify-between">
                <div>
                    <CardTitle>Watches</CardTitle>
                    <CardDescription>Manage watches</CardDescription>
                </div>

                <Button><Plus />Create</Button>
            </div>
        </CardHeader>
        <CardContent>
            <WatchesDataTable />
        </CardContent>
    </Card>
}