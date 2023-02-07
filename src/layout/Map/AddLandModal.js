import { Divider, Input, Modal } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { closeAllModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import area from '@turf/area';
import { centroid } from '@turf/turf';
import { useEffect } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { addLandRecord, getLandData } from '../API/add';
import Btn from '../globalComponents/Btn';

export default ({ feature, closeDraw, setDrawn, stopDrawer, opened, setOpened, setLoader }) => {
    // const user = useUserState()?.data
    const acres = (area(feature) / 4046.86).toFixed(2)

    const [name, setname] = useInputState('')
    const geometry = JSON.stringify(feature?.geometry?.coordinates[0])
    const location = JSON.stringify(centroid(feature))
    const [address, setAddress] = useInputState('')
    const [province, setPprovince] = useInputState('')
    const [district, setPdistrict] = useInputState('')
    const [tehsil, setPtehsil] = useInputState('')

    useEffect(() => {
        getLandData(`${feature.geometry.coordinates[0][0][1]},${feature.geometry.coordinates[0][0][0]}`).then(res => {
            console.log(res.data.results)
            const template = res.data.results[0].address_components
            const locality = template.find(x => x.types[0] === 'locality').long_name
            const tehsil = template.find(x => x.types[0] === 'administrative_area_level_3').long_name
            const district = template.find(x => x.types[0] === 'administrative_area_level_2').long_name
            const province = template.find(x => x.types[0] === 'administrative_area_level_1').long_name
            setPtehsil(tehsil)
            setPdistrict(district)
            setPprovince(province)
            setAddress(locality + ', ' + tehsil + ', ' + district + ', ' + province)
        })
            .catch(err => {
                console.log(err)
            })

        console.log('feature: ', feature.geometry.coordinates[0][0])
    }, [])

    const submit = () => {
        setLoader(true)
        let loc = JSON.parse(location).geometry.coordinates

        console.log('size: ', acres)
        console.log('Address: ', address)
        console.log('provice:', province)
        console.log('district: ', district)
        console.log('tehsil: ', tehsil)
        console.log('Location: ', JSON.stringify(loc))
        console.log('Geometry: ', geometry)
        console.log('Name: ', name)
        console.log('user_id: ', user?.id.toString())

        setOpened(false)

        addLandRecord(16, name, `${acres}Acres`, address, province, district, tehsil, JSON.stringify(loc), geometry)
            .then(res => {
                showNotification({
                    message: 'Land Record Added Successfully',
                    autoClose: 1500,
                    color: 'green',
                    disallowClose: true,
                });
                closeAllModals()
                closeDraw()
                // addLand(res?.data)
                setDrawn({})
                console.log('res: ', res)
                setLoader(false)
            })
            .catch(err => {
                showNotification({
                    message: 'Error Adding Land Record',
                    autoClose: 1500,
                    color: 'red',
                    disallowClose: true,
                });
                console.log('err: ', err)
                setLoader(false)
            })
    }
    return (
        <Modal
            opened={opened}
            onClose={() => {setOpened(false); stopDrawer()}}
            title="Add Your Land"
        >
            <div className='flex flex-col w-full'>
                <div className='flex'><b className='flex-1 py-1 px-3 bg-gray-100'>Area</b><b className='flex-1 text-right py-1 px-3 bg-gray-100'>{acres} Acres</b></div>

                <Input.Wrapper >
                    <Input
                        icon={<MdLocationOn />}
                        placeholder="Enter The Name Of Your Land"
                        radius="sm"
                        onChange={setname} value={name}
                    />
                </Input.Wrapper>

                <div className='my-2' />
                <div className='flex items-end justify-end'>
                    <Btn onClick={() => submit()}>
                        Add Land
                    </Btn>
                </div>
            </div>
        </Modal>
    )
}