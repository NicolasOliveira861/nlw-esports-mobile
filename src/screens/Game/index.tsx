import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { Background } from '../../components/Background';
import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.0.2:8080/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard key={item.id} data={item} onConnect={() => {}} />
          )}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Ainda não há anúncios publicados para esse jogo.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
