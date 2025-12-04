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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-4 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-2 animate-gradient bg-[length:200%_auto]">
            开发者工具集合
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            实用的在线开发工具，提高你的开发效率
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="h-1 w-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </header>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
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
    </div>
  )
}

export default App

