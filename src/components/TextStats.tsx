import { useState } from 'react'

interface TextStats {
  characters: number
  charactersNoSpaces: number
  words: number
  lines: number
  bytes: number
}

export default function TextStats() {
  const [text, setText] = useState('')

  const calculateStats = (input: string): TextStats => {
    const characters = input.length
    const charactersNoSpaces = input.replace(/\s/g, '').length
    const words = input.trim() ? input.trim().split(/\s+/).length : 0
    const lines = input ? input.split('\n').length : 0
    const bytes = new Blob([input]).size

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      bytes,
    }
  }

  const stats = calculateStats(text)

  const statItems = [
    { label: '字符数（含空格）', value: stats.characters },
    { label: '字符数（不含空格）', value: stats.charactersNoSpaces },
    { label: '单词数', value: stats.words },
    { label: '行数', value: stats.lines },
    { label: '字节数', value: stats.bytes },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        文本统计工具
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          输入文本
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入要统计的文本..."
          className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {item.label}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {item.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>提示：</strong>
          实时统计文本的各项指标，包括字符数、单词数、行数和字节数。
        </p>
      </div>
    </div>
  )
}

