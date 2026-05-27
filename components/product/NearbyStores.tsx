import { MapPin, Phone, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Store } from "@/components/ui/store-card"

interface NearbyStoresProps {
  stores: Store[]
  className?: string
}

export function NearbyStores({ stores, className }: NearbyStoresProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-4", className)}>
      <h3 className="font-bold text-foreground mb-4">Tìm cửa hàng gần bạn</h3>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Có sẵn tại cửa hàng gần bạn</p>

        {stores.map((store) => (
          <div key={store.id} className="border-t border-border pt-4">
            <h4 className="font-medium text-foreground mb-2">{store.name}</h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>{store.address}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a href={`tel:${store.phone}`} className="text-primary font-medium">
                  {store.phone}
                </a>
              </div>
              
              {store.isOpen !== undefined && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      store.isOpen ? "bg-green-500" : "bg-red-500"
                    )} />
                    <span className={store.isOpen ? "text-green-600" : "text-red-600"}>
                      {store.isOpen ? "Đang hoạt động" : "Đã đóng cửa"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
