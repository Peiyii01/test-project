import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'

import styles from './styles'
import Loading from './Loading'

const SECTIONS_QUERY = gql`
  query JobDetails($input: JobInput!) {
    job(input: $input) {
        id
        title
        description
        locationNames
        cities {
          name
        }
        remotes {
          name
        }
        company {
          name
        }
        tags {
          name
        }
    }
  }
`

const SectionItem = ({ section, job }) => (
  <View style={styles.item}>
    <Text style={styles.header}>
      {job.id}.{section.id}: {section.title}
    </Text>
  </View>
)

export default ({ route }) => {
  const { data, loading } = useQuery(SECTIONS_QUERY, {
    variables: { input: route.params.job },
  })

  if (loading) {
    return <Loading />
  }

  const { job } = data

  return (
    job.map(({ title, cities, remotes, company, tags }) => (
      <div key={title}>
        <p>
          {title}:
          {cities.map((cities) => (
            <div>{cities.name}</div>
          ))}
          {remotes.map((remotes) => (
            <div>{remotes.name}</div>
          ))}
          <div>{company.name}</div>
          <div>
            {tags.map((tags) => (
              <p>{tags.name}</p>
            ))}
          </div>
        </p>
      </div>
    ))
  )
}
