import { useState, useEffect } from 'react'

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [isMilliseconds, setIsMilliseconds] = useState(false)
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatDateTime = (ts: number): string => {
    const date = new Date(ts)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

  const timestampToDateTime = (ts: string) => {
    if (!ts.trim()) {
      setDateTime('')
      return
    }

    const num = parseInt(ts, 10)
    if (isNaN(num)) {
      setDateTime('')
      return
    }

    const tsValue = isMilliseconds ? num : num * 1000
    setDateTime(formatDateTime(tsValue))
  }

  const dateTimeToTimestamp = (dt: string) => {
    if (!dt.trim()) {
      setTimestamp('')
      return
    }

    try {
      const date = new Date(dt)
      if (isNaN(date.getTime())) {
        setTimestamp('')
        return
      }

      const ts = isMilliseconds ? date.getTime() : Math.floor(date.getTime() / 1000)
      setTimestamp(ts.toString())
    } catch (e) {
      setTimestamp('')
    }
  }

  const handleTimestampChange = (value: string) => {
    setTimestamp(value)
    timestampToDateTime(value)
  }

  const handleDateTimeChange = (value: string) => {
    setDateTime(value)
    dateTimeToTimestamp(value)
  }

  const handleToggleUnit = () => {
    const newIsMilliseconds = !isMilliseconds
    setIsMilliseconds(newIsMilliseconds)

    if (timestamp) {
      const num = parseInt(timestamp, 10)
      if (!isNaN(num)) {
        const tsValue = newIsMilliseconds ? num * 1000 : Math.floor(num / 1000)
        setTimestamp(tsValue.toString())
        timestampToDateTime(tsValue.toString())
      }
    }
  }

  const handleUseCurrent = () => {
    const ts = isMilliseconds ? currentTimestamp : Math.floor(currentTimestamp / 1000)
    setTimestamp(ts.toString())
    timestampToDateTime(ts.toString())
  }

  const handleCopy = (content: string) => {
    if (content) {
      navigator.clipboard.writeText(content)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 p-6 transition-all duration-300 hover:shadow-xl">
      <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          时间戳转换工具
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleUnit}
            className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
          >
            {isMilliseconds ? '切换到秒' : '切换到毫秒'}
          </button>
          <button
            onClick={handleUseCurrent}
            className="px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors"
          >
            使用当前时间
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Unix 时间戳 ({isMilliseconds ? '毫秒' : '秒'})
            </label>
            {timestamp && (
              <button
                onClick={() => handleCopy(timestamp)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                复制
              </button>
            )}
          </div>
          <input
            type="text"
            value={timestamp}
            onChange={(e) => handleTimestampChange(e.target.value)}
            placeholder={`输入 ${isMilliseconds ? '毫秒' : '秒'} 级时间戳...`}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              日期时间
            </label>
            {dateTime && (
              <button
                onClick={() => handleCopy(dateTime)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                复制
              </button>
            )}
          </div>
          <input
            type="text"
            value={dateTime}
            onChange={(e) => handleDateTimeChange(e.target.value)}
            placeholder="输入日期时间，例如：2024-01-01 12:00:00"
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {dateTime && timestamp && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              格式化：{formatDateTime(isMilliseconds ? parseInt(timestamp, 10) : parseInt(timestamp, 10) * 1000)}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>提示：</strong>
          当前时间戳：{isMilliseconds ? currentTimestamp : Math.floor(currentTimestamp / 1000)} ({isMilliseconds ? '毫秒' : '秒'})
        </p>
      </div>
    </div>
  )
}

