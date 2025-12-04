import { useState } from 'react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isMinified, setIsMinified] = useState(false)

  const formatJson = (jsonString: string, minify: boolean) => {
    if (!jsonString.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      const parsed = JSON.parse(jsonString)
      const formatted = minify
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : '无效的 JSON 格式')
      setOutput('')
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    formatJson(value, isMinified)
  }

  const handleToggleMinify = () => {
    const newMinified = !isMinified
    setIsMinified(newMinified)
    formatJson(input, newMinified)
  }

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          JSON 格式化工具
        </h2>
        <button
          onClick={handleToggleMinify}
          className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
        >
          {isMinified ? '美化' : '压缩'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            输入 JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder='{"name": "example", "value": 123}'
            className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              格式化结果
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                复制
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="格式化后的 JSON 将显示在这里..."
            className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-800 dark:text-red-200">
            <strong>错误：</strong>
            {error}
          </p>
        </div>
      )}
    </div>
  )
}

