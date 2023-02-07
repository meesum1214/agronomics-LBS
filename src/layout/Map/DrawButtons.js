import { MdAdd } from 'react-icons/md'
import { showNotification } from '@mantine/notifications';
import { memo, useState } from 'react'
import { openModal } from '@mantine/modals'
import { useDidUpdate } from '@mantine/hooks';
import Btn from '../globalComponents/Btn';
import DrawPoly from './DrawPoly';
import AddLandModal from './AddLandModal';


const Setup = ({setLoader}) => {

    const [opened, setOpened] = useState(false)


    const [Draw, setDraw] = useState(false)
    const [drawn, setDrawn] = useState({})
    const startDrawer = () => {
        showNotification({
            message: 'Draw Your Land Boundary On Map',
            autoClose: 1500,
            color: 'green',
            disallowClose: true,
        });
        setDraw(true)
    }

    const stopDrawer = () => {
        setDraw(false)
    }

    const submitPoly = () => {
        console.log(Object.values(drawn)?.[0])
        setOpened(true)
        // openModal({
        //     title: <b>Add Your Land</b>,
        //     children: (<AddLandModal closeDraw={setDraw} feature={Object.values(drawn)?.[0]} setDrawn={setDrawn} />),
        //     onClose: () => stopDrawer(),
        // });

    }

    useDidUpdate(() => {
        if (Object.keys(drawn).length > 0) {
            submitPoly()
        }
    }, [drawn])




    return (
        <>
            {Draw && <DrawPoly setDrawn={setDrawn} />}
            <div className='absolute bottom-6 right-6 z-30 flex'>
                {
                    !Draw ?
                        <Btn onClick={() => {
                            startDrawer()
                        }}>
                            <b className='flex mx-4 font-bold tracking-wide'> <MdAdd className=' mx-2' size={15} />Add Land </b>
                        </Btn>
                        :
                        <Btn onClick={() => {
                            stopDrawer()
                        }}>
                            <b className='mx-4 tracking-wide'>Cancel</b>
                        </Btn>
                }
                {
                    Draw &&
                    <Btn onClick={() => {
                        submitPoly()
                    }}>
                        <b className='mx-4 tracking-wide'>Submit</b>
                    </Btn>
                }

                {Object.values(drawn)?.[0] && <AddLandModal setLoader={setLoader} closeDraw={setDraw} feature={Object.values(drawn)?.[0]} setDrawn={setDrawn} stopDrawer={stopDrawer} opened={opened} setOpened={setOpened} />}

            </div>
        </>
    )
}


export default memo(Setup);