import { MapPin, Phone, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Store {
  id: string
  name: string
  address: string
  phone: string
  isOpen?: boolean
  distance?: string
}

interface StoreCardProps {
  store: Store
  className?: string
}

export function StoreCard({ store, className }: StoreCardProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-4", className)}>
      <h4 className="font-medium text-foreground mb-3">{store.name}</h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
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
            <span className={store.isOpen ? "text-green-600" : "text-red-600"}>
              {store.isOpen ? "Đang hoạt động" : "Đã đóng cửa"}
            </span>
          </div>
        )}
        
        {store.distance && (
          <div className="text-xs text-muted-foreground">
            Cách bạn {store.distance}
          </div>
        )}
      </div>
    </div>
  )
}
