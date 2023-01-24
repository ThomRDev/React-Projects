import { collection, deleteDoc, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../../../firebase/config"
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../store/journal/journalSlice"
import { startNewNote } from "../../../store/journal/thunks"

describe('Tests in Thunks journal file', () => {
  
  const dispatch = jest.fn()
  const getState = jest.fn()
beforeEach( () => jest.clearAllMocks() );
  it('startNewNote should create a new empty note', async () => {
    const uid = 'TEST-UID';
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()( dispatch, getState,{} );

    expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
    expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
        body: '',
        title:'',
        id: expect.any( String ),
        date: expect.any( Number ),
    }));
    expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
        body: '',
        title:'',
        id: expect.any( String ),
        date: expect.any( Number ),
    }));

    // // Borrar de firebase
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);
    const docs = await getDocs( collectionRef );

    const deletePromises:any[] = [];
    docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
    await Promise.all( deletePromises );
  },10000)
  // no me funciona, setdoc nunca termina, FUNCIONOOO
  // "firebase": "^9.9.2",
  // Y AGREGE 10000
})