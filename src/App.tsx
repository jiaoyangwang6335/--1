import { useState } from 'react'
import ToolTabs from './components/ToolTabs'
import JsonFormatter from './components/JsonFormatter'
import Base64Encoder from './components/Base64Encoder'
import UrlEncoder from './components/UrlEncoder'
import TimestampConverter from './components/TimestampConverter'
import TextStats from './components/TextStats'

type Tool = 'json' | 'base64' | 'url' | 'timestamp' | 'textstats'

function App() {
  const [activeTool, setActiveTool] = useState<Tool>('json')

  const tools = [
    { id: 'json' as Tool, name: 'JSON 格式化' },
    { id: 'base64' as Tool, name: 'Base64 编码' },
    { id: 'url' as Tool, name: 'URL 编码' },
    { id: 'timestamp' as Tool, name: '时间戳转换' },
    { id: 'textstats' as Tool, name: '文本统计' },
  ]

  const renderTool = () => {
    switch (activeTool) {
      case 'json':
        return <JsonFormatter />
      case 'base64':
        return <Base64Encoder />
      case 'url':
        return <UrlEncoder />
      case 'timestamp':
        return <TimestampConverter />
      case 'textstats':
        return <TextStats />
      default:
        return <JsonFormatter />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            开发者工具集合
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            实用的在线开发工具，提高你的开发效率
          </p>
        </header>

        <ToolTabs
          tools={tools}
          activeTool={activeTool}
          onToolChange={setActiveTool}
        />

        <div className="mt-6">
          {renderTool()}
        </div>
      </div>
    </div>
  )
}

export default App

