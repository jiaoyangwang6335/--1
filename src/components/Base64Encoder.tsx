import { useState } from 'react'

export default function Base64Encoder() {
  const [text, setText] = useState('')
  const [base64, setBase64] = useState('')

  const encodeToBase64 = (input: string) => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setBase64(encoded)
    } catch (e) {
      setBase64('')
    }
  }

  const decodeFromBase64 = (input: string) => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setText(decoded)
    } catch (e) {
      setText('')
    }
  }

  const handleTextChange = (value: string) => {
    setText(value)
    if (value) {
      encodeToBase64(value)
    } else {
      setBase64('')
    }
  }

  const handleBase64Change = (value: string) => {
    setBase64(value)
    if (value) {
      try {
        decodeFromBase64(value)
      } catch (e) {
        // 如果解码失败，不清空文本输入
      }
    } else {
      setText('')
    }
  }

  const handleCopy = (content: string) => {
    if (content) {
      navigator.clipboard.writeText(content)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Base64 编码/解码工具
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              文本
            </label>
            {text && (
              <button
                onClick={() => handleCopy(text)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                复制
              </button>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="输入要编码的文本..."
            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Base64
            </label>
            {base64 && (
              <button
                onClick={() => handleCopy(base64)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                复制
              </button>
            )}
          </div>
          <textarea
            value={base64}
            onChange={(e) => handleBase64Change(e.target.value)}
            placeholder="输入要解码的 Base64 字符串..."
            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>提示：</strong>
          在任意一侧输入内容，另一侧会自动转换。支持中文和特殊字符。
        </p>
      </div>
    </div>
  )
}

