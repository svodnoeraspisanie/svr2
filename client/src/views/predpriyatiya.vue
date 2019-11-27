<template>

<div class="fill-height">
  

 <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
    app
        width="300px"
    >

    <v-list-item>
        <v-list-item-content>
            <v-list-item-title class="title">
            Поиск:
          </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
             <v-list-item>

        <v-list-item-content>


          <v-list-item-title class="title">
            Место:
          </v-list-item-title>

               <v-select
          :items="city"

        ></v-select>
              </v-list-item-content>
      </v-list-item>
        <v-list-item>

        <v-list-item-content>


          <v-list-item-title class="title">
            Метки:
          </v-list-item-title>

                <v-flex
          v-for="(selection, i) in selections"
          :key="selection.text"
          shrink
        >
          <v-chip
            :disabled="loading"
            close
            @click:close="selected.splice(i, 1)"
          >
            <v-icon
              left
              v-text="selection.icon"
            ></v-icon>
            {{ selection.text }}
          </v-chip>
        </v-flex>

        <v-flex v-if="!allSelected" xs12>

          <v-text-field
            ref="search"
            v-model="search"
            full-width
            hide-details
            label="Поиск"
            single-line
          ></v-text-field>
             <v-divider v-if="!allSelected"></v-divider>
        </v-flex>


    <v-list>
      <template v-for="(item, i) in categories">
        <v-list-item
          v-if="!selected.includes(i)"
          :key="i"
          :disabled="loading"
          @click="selected.push(i)"
        >
          <v-list-item-avatar>
            <v-icon
              :disabled="loading"
              v-text="item.icon"
            ></v-icon>
          </v-list-item-avatar>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </template>
    </v-list>

    </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>


<appbar v-on:toggle-drawer="drawer=!drawer" >

<h2>Список предприятий</h2>
<v-spacer></v-spacer>
</appbar>

<v-content class="fill-height">
      <v-container
        style="height:99%"
        class="pt-0 mt-0"
        fluid
      >

 <v-row>
<v-col  md="3" xs="12" v-for="pr in predpriyatiya" :key="pr.n">
      <v-card class="flexcard" height="100%" >


        <v-img
        :src="pr.obraz"
        aspect-ratio="1.5"
        contain >

            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="teal lighten-5"></v-progress-circular>
            </v-layout>
         </v-img>

          <v-card-title>{{pr.nazvanie}}</v-card-title>
          <v-card-text> {{pr.kratkoe_opisanie}}</v-card-text>


          <v-spacer/>

            <v-divider/>

              <v-card-actions>

                   <b>Место: </b>

                    <v-chip v-for="(mesto, nm) in pr.mesto" :key="nm" small >{{mesto}} </v-chip>

</v-card-actions>
                <v-card-actions>

                    <div width="100%">
                      <b>Метки: </b>
                    <v-chip v-for="(metka, nm) in pr.metki" :key="nm" small >{{metka}} </v-chip>
</div>


            </v-card-actions>

      </v-card>
</v-col>
  </v-row>
    </v-container>
   </v-content>
</div>
</template>

<script>
import appbar from '../components/appbar.vue';

export default {
  components: {

    appbar,

  },
  data: () => ({
    drawer: true,
    predpriyatiya: [
      {
        n: 1,
        nazvanie: 'Чёрная Сотня',
        sozdano: '',
        kratkoe_opisanie: "Книжный клуб Издательства 'Чёрная Сотня'",
        podrobnoe_opisanie: 'Миссия Книжного Клуба — обеспечить непрерывную деятельность издательства «Чёрная Сотня» по двум направлениям: <br>1. Поиск, восстановление и возвращение в Россию русского литературного, культурного и научного наследия русского зарубежья и работ, попавших под цензуру в советское время.<br>2. Издание современных важнейших работ.<br>У «Чёрной Сотни» никогда не было инвесторов и спонсоров, кроме самих читателей, пять лет мы издавали книги с минимальными ресурсами и выкручивались, как могли. Да, выходило превосходно, но этого мало — с системой предзаказов мы не можем выпускать больше двух книг в год и не можем позволить себе полноценные поиски. Чтобы делать больше, нам требуется постоянная финансовая подпитка, которую сможете обеспечить только вы. Наше наследие забыто и брошено по всей планете (вспомните «Русский комикс, 1935-1945, Королевство Югославия», о котором вообще никто не знал), и никого кроме нас это особо не волнует.<br>За эти пять лет мы показали, на что мы способны. Доказали, что можем реализовывать проекты национального масштаба. Вместе с вами мы сможем ещё больше, и поверьте, это будет не только Большое Русское Дело, но и увлекательное шоу. <br>Присоединяйтесь!',
        obraz: '/obrazy/chernaya100.jpeg',
        ssilki: { patreon: 'https://www.patreon.com/chernaya100' },
        scheta: [
          'patreon: https://www.patreon.com/chernaya100',
        ],
        meropriyatiya: [],
        metki: ['клуб', 'книги', 'культура'],
        mesto: ['Сеть', 'Санкт-Петербург'],
      },
      {
        n: 2,
        nazvanie: 'Международное общественное движение «Альтернатива»',
        sozdano: '2011',
        kratkoe_opisanie: 'Освобождаем от рабства',
        podrobnoe_opisanie: 'Международное общественное движение «Альтернатива» было создано в 2011 году правозащитником Олегом Мельниковым из гуманистических побуждений и по соображению совести, дабы помочь жертвам современного рабства спастись из неволи и начать свободную жизнь. <br>«Альтернатива» помогает жертвам принудительного труда, проституции, попрошайничества и семейного насилия.<br>«Альтернатива» — единственная профильная организация, которая непосредственно участвует в спасательных операциях как на территории РФ, так и в других регионах мира. После освобождения, жертвам предлагается помощь в возвращении домой, или безопасное убежище. По запросу, активисты предоставляют поддержку психолога, юриста-консультанта и помощь в трудоустройстве.Также активисты «Альтернативы» не раз помогали соотечественникам, которые в силу сложившихся обстоятельств (утрата документов) годами жили на нелегальном положении за границей и не имели возможности вернуться домой. <br>«Альтернатива» регулярно публикует сюжеты об освобождениях, проведённых активистами, а также срез релевантных мировых новостей, отражающих текущее состояние проблемы.',
        obraz: '/obrazy/alternative.png',
        ssilki: [
          'Сайт: https://alternative.help/',
          'Patreon: https://www.patreon.com/alternative_movement',
          'Facebook:https://www.facebook.com/ru.alternative.help/',
          'Instagram: https://www.instagram.com/alternative.help/',
          'Telegram: https://t.me/alternativa_channel',
          'Twitter:https://twitter.com/AlternativaRus',
          'Youtube:https://www.youtube.com/channel/UCy6TiUfVnyALXPvfNUCkzSg',
          'Odnoklassniki: https://ok.ru/alternativhelp/',
        ],
        scheta: [
          'Patreon: https://www.patreon.com/alternative_movement',
          'Сбербанк > 4276 3801 5524 4887',
          'Яндекс.Деньги > www.money.yandex.ru/to/410011569894386',
          'Qiwi-кошелек > +7 (964) 573-72-07',
          'WebMoney > R305103454198',
          'PayPal > www.paypal.me/AlternativeHelp',
          'BitCoin (BTC) > 181QVAnrRkAF3zFfg47ZAE4tCNYjwgW7qc',
          'Ethereum (ETH) > 0xe36AcE1c0FEA57Ac58eC8003e13Cd850B41E0a63',
        ],
        meropriyatiya: [],
        metki: ['рабство'],
        mesto: ['Сеть', 'Весь мир'],
      },
      {
        n: 3,
        nazvanie: 'Розанов Клуб',
        sozdano: '',
        kratkoe_opisanie: 'Розанов Клуб - это открытое собрание добрых русских людей и единственная национальная площадка в которой мы собрали все виды контента: живые лекции, экскурсии, статьи, видеоролики, стримы и подкасты. Мы всегда открыты к сотрудничесву и готовы принять новых людей.',
        podrobnoe_opisanie: '',
        obraz: '/obrazy/rozanovclub.jpg',
        ssilki: [
          'Patreon: https://www.patreon.com/rozanovclub',
          'вКонтакте: https://vk.com/rozanovclub',
          'Instagram: https://www.instagram.com/rozanovclub/',
          'Youtube: https://www.youtube.com/channel/UCTP20lo68ZHFA5bXigF975A',

        ],
        scheta: [
          'Patreon: https://www.patreon.com/rozanovclub',
          'DonationAlerts: https://www.donationalerts.com/r/rozanovclub',

        ],
        meropriyatiya: [],
        metki: ['клуб', 'лекции', 'культура'],
        mesto: ['Сеть', 'Санкт-Петербург'],
      },
      {
        n: 4,
        nazvanie: 'Центра изучения этнической преступности. Дмитрий Бобров',
        sozdano: '2019',
        kratkoe_opisanie: 'Независимый проект по сбору и анализу информации связанной с этнопреступностью в Российской Федерации.',
        podrobnoe_opisanie: '',
        obraz: '/obrazy/ethnocrime.png',
        ssilki: [
          'Сайт: http://etnocrime.info',
          'Элпочта: etnocrime@protonmail.com',
          'Patreon: https://www.patreon.com/dmbobrov',
          'Youtube: https://www.youtube.com/user/nsiorg',


        ],
        scheta: [
          'Patreon: https://www.patreon.com/dmbobrov',
          'карта Сбербанка: 5336 6900 6767 1067',

        ],
        meropriyatiya: [

        ],
        metki: ['преступность', 'исследование', 'мигранты', 'кавказ', 'азия'],
        mesto: ['Сеть', 'Санкт-Петербург'],
      },
      {
        n: 5,
        nazvanie: '',
        sozdano: '',
        kratkoe_opisanie: '',
        podrobnoe_opisanie: '',
        obraz: '',
        ssilki: [

        ],
        scheta: [

        ],
        meropriyatiya: [

        ],
        metki: [],
        mesto: [],
      },
    ],
  }),

};
</script>

<style>
 .flexcard {
            display: flex;
            flex-direction: column;
        }

          
</style>
