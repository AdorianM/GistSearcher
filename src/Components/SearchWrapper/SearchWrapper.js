import {useState, useEffect} from 'react';
import GistViewer from "../GistViewer/GistViewer";
import axios from "axios";
import './SearchWrapper.css'
import Modal from 'react-modal';

const SearchWrapper = () => {

    const [searchField, setSearchField] = useState("");
    const [gists, setGists] = useState([]);
    const [forks, setForks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const API_URL = "https://api.github.com";

    const searchGists = async () => {
        let res = await axios({
            method: "get",
            url: `${API_URL}/users/${searchField}/gists`,
            // headers: {
            //     'Authorization': `token ${ACCESS_TOKEN}`
            // }
        });

        console.log("Gists:");
        console.log(res.data);
        await setGists(res.data);
        await getForkInfo(res.data);
    }

    useEffect(() => {
        getForkInfo(gists);
    }, [gists]);

    useEffect(() => {
        console.log(forks);
    }, [forks]);

    useEffect(() => {
        console.log(modalContent);
    }, [modalContent]);

    const getForkInfo = (gists) => {
        setForks([]);
        gists.forEach(async (gist) => {
            const url = gist.forks_url;

            let res = await axios({
                method: "get",
                url: url,
                /*headers: {
                    'Authorization': `token ${ACCESS_TOKEN}`
                }*/
            });

            const currentFork = [gist.id, res.data];
            if(res.data.length > 0) {
                setForks([...forks, currentFork]);
            }
        });

    }

    const handleSearchChanged = (e) => {
        setSearchField(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        searchGists();
    }

    const handleModalContentChanged = (id) => {
        setShowModal(true);
        gists.forEach(gist => {
            if(gist.id === id) {
                let files = Object.values(gist.files);

                files.forEach(file => {
                    setModalContent(file.raw_url + "\n" + modalContent);
                });
            }
        });
    }

    const closeModal = (e) => {
        e.preventDefault();
        setShowModal(false);
        setModalContent([]);
    }

    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width                 : '800px',
            height                : '600px',
            padding               : '60px',
            backgroundColor       : '#f3f3f3',
            wordBreak             : 'break-all',
            textAlign             : 'center',
            borderRadius          : '0'
        }
    };

    Modal.setAppElement('#root');

    return (
        <div className="searchWrapper">
            <form>
                <input type="text" placeholder="Search..." onChange={e => handleSearchChanged(e)}/>
                <button type="submit" onClick={e => handleSubmit(e)}>Search</button>
            </form>
            <GistViewer gists={gists} forks={forks} modalHandler={(id) => handleModalContentChanged(id)}/>
            <Modal isOpen={showModal} style={customStyles}>
                <div className="gistContent">
                    <p>{modalContent}</p>
                </div>
                <button className="modal-button" onClick={(e) => closeModal(e)}>
                    Close modal
                </button>
            </Modal>
        </div>
    );
}

export default SearchWrapper;
