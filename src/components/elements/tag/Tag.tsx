interface TagProps {
  text: string;
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "neutral";
  variant?: "solid" | "outline" | "soft";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Tag({
  text,
  color = "primary",
  variant = "solid",
  size = "md",
  className = "",
}: TagProps) {
  const baseClasses =
    "inline-flex items-center font-medium rounded-full transition-colors duration-200";

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const colorClasses = {
    solid: {
      primary: "bg-indigo-500 text-white border border-indigo-500",
      secondary: "bg-teal-500 text-white border border-teal-500",
      accent: "bg-orange-500 text-white border border-orange-500",
      success: "bg-green-500 text-white border border-green-500",
      warning: "bg-yellow-500 text-black border border-yellow-500",
      error: "bg-red-500 text-white border border-red-500",
      neutral: "bg-stone-500 text-white border border-stone-500",
    },
    outline: {
      primary:
        "bg-transparent text-indigo-600 border border-indigo-300 hover:bg-indigo-50",
      secondary:
        "bg-transparent text-teal-600 border border-teal-300 hover:bg-teal-50",
      accent:
        "bg-transparent text-orange-600 border border-orange-300 hover:bg-orange-50",
      success:
        "bg-transparent text-green-600 border border-green-300 hover:bg-green-50",
      warning:
        "bg-transparent text-yellow-600 border border-yellow-300 hover:bg-yellow-50",
      error:
        "bg-transparent text-red-600 border border-red-300 hover:bg-red-50",
      neutral:
        "bg-transparent text-stone-600 border border-stone-300 hover:bg-stone-50",
    },
    soft: {
      primary: "bg-indigo-100 text-indigo-800 border border-indigo-200",
      secondary: "bg-teal-100 text-teal-800 border border-teal-200",
      accent: "bg-orange-100 text-orange-800 border border-orange-200",
      success: "bg-green-100 text-green-800 border border-green-200",
      warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      error: "bg-red-100 text-red-800 border border-red-200",
      neutral: "bg-stone-100 text-stone-800 border border-stone-200",
    },
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${colorClasses[variant][color]} ${className}`;

  return <span className={classes}>{text}</span>;
}
