import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const TabDetails = ({name,contact,address}) => {
    return (
        <Tabs className='my-3 mx-3'>
            <TabList>
                <Tab>Details</Tab>
                <Tab>Contact</Tab>
            </TabList>

            <TabPanel>
                <h2>{name}</h2>
                <p>
                    <b>{name}</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
            </TabPanel>
            <TabPanel>
                <p>{address}</p>
                <p>Phone: {contact?contact:'Not Available!'}</p>
            </TabPanel>

        </Tabs>
    )
}

export default TabDetails