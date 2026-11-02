import { useState } from "react"
import { getApiKey, setApiKey as saveApiKey, } from "../utils/storage"
import { X } from "lucide-react"

type ApiConfigModalProps = {
    onClose: () => void
    onSave: () => void
}


const ApiConfigModal = ({ onClose, onSave }: ApiConfigModalProps) => {
    const [apiKey, setApiKey] = useState(getApiKey)

    function handleSave() {
        saveApiKey(apiKey)
        onSave()
        onClose()
    }

    return (
        <div className="modal-overlay active">
            <div
                className="modal-dialog api-config-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="api-config-title"

            >
                <button
                    type="button"
                    className="modal-close-btn"
                    aria-label="Close API settings"
                    title="Close API settings"
                    onClick={onClose}
                >
                    <X />
                </button>
                <h2 id="api-config-title">TMDB API Key</h2>

                <label htmlFor="tmdb-api-key">API key</label>
                <input
                    id="tmdb-api-key"
                    type="password"
                    value={apiKey}
                    onChange={(event) =>
                        setApiKey(event.target.value)
                    }
                />
                <button
                    type="button"
                    className="btn-primary"
                    onClick={handleSave}
                >
                    Save key
                </button>
            </div>
        </div>
    )
}

export default ApiConfigModal
