import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  subtitle?: string;
  trend?: number;
}

function StatsCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-50 dark:bg-blue-900/30",
  subtitle,
  trend,
}: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
          {trend !== undefined && (
            <p
              className={`text-xs font-medium mt-1 ${trend >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
