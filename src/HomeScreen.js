import React from 'react'
import { Text, FlatList, Pressable } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { AppLoading } from 'expo'

import styles from './styles'

const JOBS_QUERY = gql`
  query getJobs {
    jobs {
      id
      title
      locationNames
    }
  }
`

const JobItem = ({ job, onPress }) => {
  const { title, locationNames } = job
  let header, subheader

    header = title
    subheader = locationNames

  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.header}>{header}</Text>
      {subheader && <Text style={styles.subheader}>{subheader}</Text>}
    </Pressable>
  )
}

export default ({ navigation }) => {
  const { data, loading } = useQuery(JOBS_QUERY)

  if (loading) {
    return <AppLoading />
  }

  return (
    <FlatList
      data={data.jobs}
      renderItem={({ item }) => (
        <JobItem
          job={item}
          onPress={() => navigation.navigate('Job', { job: item })}
        />
      )}
      keyExtractor={(job) => job.id.toString()}
    />
  )
}