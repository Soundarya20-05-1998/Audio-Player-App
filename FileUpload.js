import React from 'react';
import Dexie from 'dexie';
import './FileUpload.css';

const db = new Dexie('AudioFilesDatabase');

db.version(1).stores({
    audioFiles: '++id,filename,audioBlob',
});

function FileUpload() {
    const [audioFiles, setAudioFiles] = useState([]);

    useEffect(() => {
        const fetchAudioFiles = async () => {
            try {
                const files = await db.audioFiles.toArray();
                setAudioFiles(files);
                console.log('Audio files fetched successfully');
            } catch (error) {
                console.error('Error fetching audio files:', error);
            }
        };
        fetchAudioFiles();
    }, []);    
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async () => {
            const audioBlob = reader.result;
            const newAudioFile = { filename: file.name, audioBlob };
            setAudioFiles((prevAudioFiles) => [...prevAudioFiles, newAudioFile]);

            await saveAudioFile(newAudioFile);
        };
        reader.readAsDataURL(file);
    };
    
    const saveAudioFile = async (audioFile) => {
        try {
            await db.audioFiles.add(audioFile);
            console.log('Audio file saved successfully');
        } catch (error) {
            console.error('Error saving audio file:', error);
        }
    };

    return (
        <div className="FileUploadContainer">
            <input type="file" className="FileInput" onChange={handleFileChange}/>
            <ul className="AudioList">
                {audioFiles.map((audioFile, index) => (
                    <li key={index}className="AudioListItem">{audioFile.filename}</li>
                ))}
            </ul>
        </div>
    );
}

export default FileUpload;