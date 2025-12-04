type Tool = 'json' | 'base64' | 'url' | 'timestamp' | 'textstats'

interface ToolTab {
  id: Tool
  name: string
}

interface ToolTabsProps {
  tools: ToolTab[]
  activeTool: Tool
  onToolChange: (tool: Tool) => void
}

export default function ToolTabs({ tools, activeTool, onToolChange }: ToolTabsProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              transition-all duration-200 relative
              ${
                activeTool === tool.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }
            `}
          >
            {tool.name}
            {activeTool === tool.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}

