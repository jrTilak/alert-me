import { useEffect, useState } from "react"

import PopUtils from "~utils/popup-utils"

const PopupIndex = () => {
  const [hostname, setHostname] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    PopUtils.getCurrentTabUrl()
      .then((url) => {
        setHostname(url)
      })
      .catch(() => {
        setError("Unable to retrieve URL")
      })
  }, [])

  return (
    <main>
      {hostname && <div>Hostname: {hostname}</div>}
      {error && (
        <div>
          Error: This extension can't be activated on this native Chrome page.
          Try on another tab. Or browser a website and relaunch..
        </div>
      )}
    </main>
  )
}
export default PopupIndex
