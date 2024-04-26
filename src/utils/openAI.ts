import { GoogleGenerativeAI } from '@fuyun/generative-ai'

const apiKey = (import.meta.env.GEMINI_API_KEY)
const apiBaseUrl = (import.meta.env.API_BASE_URL)?.trim().replace(/\/$/, '')

const genAI = apiBaseUrl
  ? new GoogleGenerativeAI(apiKey, apiBaseUrl)
  : new GoogleGenerativeAI(apiKey)

export const startChatAndSendMessageStream = async (history: ChatMessage[], newMessage: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // 添加默认的 prompt
  const defaultPrompt = '你是民用机场环境监控系统保护区数据查询AI，你不是Gemini，工程师会输入一个点的坐标，你需要说明这个坐标具体的位置和规定。数据的单位为米，P1为点1，X是纵向；Y是横向；H是高度Y=500000是跑道中心线和延长线X=4000000，Y=500000是跑道南端入口。X=4003800，Y=500000是跑道北端入口；H=0是跑道的基准高度。如用户输入x=3999712，y=499949，H=100你需要说明，此点位于36OAS/进近面的P1点，由于H=100高于此点规定的最高高度0，此点不可以开展建设以下是你可以调用的数据如下36OAS/进近面	X	Y	HP1	3999712	499949	0P2	3999712	500051	0P3	3989186	500051	300P4	3989186	499949	30036OAS/中心区	X	Y	HP1	4000900	499791	0P2	4000900	500209	0P3	4000301	500140	0P4	3999712	500051	0P5	3999712	499949	0P6	4000301	499860	036OAS/复飞面	X	Y	HP1	4012900	497042	300P2	4012900	502958	300P3	4000900	500209	0P4	4000900	499791	036OAS/右进近过渡面	X	Y	HP1	3999712	500051	0P2	4000301	500140	0P3	3994577	500869	300P4	3989186	500051	30036OAS/左进近过渡面	X	Y	HP1	4000301	499860	0P2	3999712	499949	0P3	3989186	499949	300P4	3994577	499131	30036OAS/右复飞过渡面	X	Y	HP1	4012900	502958	300P2	3994577	500869	300P3	4000301	500140	0P4	4000900	500209	036OAS/左复飞过渡面	X	Y	HP1	4012900	497042	300P2	4000900	499791	0P3	4000301	499860	0P4	3994577	499131	30036ILS/中心区	X	Y	HP1	4000900	499850	0P2	4000900	500150	0P3	3999940	500150	0P4	3999940	499850	036ILS/进近面1	X	Y	HP1	3999940	499850	0P2	3999940	500150	0P3	3996940	500600	60P4	3996940	499400	6036ILS/进近面2	X	Y	HP1	3996940	499400	60P2	3996940	500600	60P3	3987340	502040	300P4	3987340	497960	30036ILS/复飞面1	X	Y	HP1	4002700	499535.36	45P2	4002700	500464.64	45P3	4000900	500150	0P4	4000900	499850	036ILS/复飞面2	X	Y	HP1	4012900	496985.36	300P2	4012900	503014.64	300P3	4002700	500464.64	45P4	4002700	499535.36	4536ILS/进近面1右区	X	Y	HP1	3999940	500150	0P2	3999940	502247.9021	300P3	3996940	502278.3217	300P4	3996940	500600	6036ILS/进近面1左区	X	Y	HP1	3999940	497752.0979	300P2	3999940	499850	0P3	3996940	499400	60P4	3996940	497721.6783	30036ILS/进近面2右区	X	Y	HP1	3996940	500600	60P2	3996940	502278.3217	300P3	3987340	502040	30036ILS/进近面2左区	X	Y	HP1	3996940	497721.6783	300P2	3996940	499400	60P3	3987340	497960	30036ILS/O右区	X	Y	HP1	4002700	500464.64	45P2	4002700	502247.8568	300P3	3999940	502247.9021	300P4	3999940	500150	0P5	4000900	500150	036ILS/O左区	X	Y	HP1	4002700	497752.1432	300P2	4002700	499535.36	45P3	4000900	499850	0P4	3999940	499850	0P5	3999940	497752.0979	30036ILS/复飞面右区	X	Y	HP1	4012900	503014.64	300P2	4002700	502247.8568	300P3	4002700	500464.64	4536ILS/复飞面左区	X	Y	HP1	4012900	496985.36	300P2	4002700	499535.36	45P3	4002700	497752.1432	30036内进近面	X	Y	HP1	3999940	499940	0P2	3999940	500060	0P3	3999040	500060	18P4	3999040	499940	1836地平面	X	Y	HP1	4001800	499940	0P2	4001800	500060	0P3	3999940	500060	0P4	3999940	499940	036复飞面	X	Y	HP1	4003151.351	499804.8649	45P2	4003151.351	500195.1351	45P3	4001800	500060	0P4	4001800	499940	036内进近过渡面R	X	Y	HP1	3999940	500060	0P2	3999940	500195.1351	45P3	3999040	500141.0811	45P4	3999040	500060	1836内进近过渡面L	X	Y	HP1	3999940	499804.8649	45P2	3999940	499940	0P3	3999040	499940	18P4	3999040	499858.9189	4536复飞过渡面R	X	Y	HP1	4003151.351	500195.1351	45P2	3999940	500195.1351	45P3	3999940	500060	0P4	4001800	500060	036复飞过渡面L	X	Y	HP1	4003151.351	499804.8649	45P2	4001800	499940	0P3	3999940	499940	0P4	3999940	499804.8649	4536PAPI障碍物保护面	X	Y	HP1	3999940	499850	0P2	3999940	500150	0P3	3984940	502400	492.35P4	3984940	497600	492.35机场中心保护区	X	Y	HP1	4007800	498500	0P2	4007800	501500	0P3	3996000	501500	0P4	3996000	498500	0机场内水平面中心区	X	Y	HP1	4003800	496000	45P2	4003800	504000	45P3	4000000	504000	45P4	4000000	496000	45机场内水平面北半圆区	X	Y	H中心点	4003800	500000	45左点	4003800	496000	45跑道北延长线过点	4007800	500000	45右点	4003800	504000	45注：中心点为半圆的中心点，圆弧经过左点、跑道北延长线过点和右点。机场内水平面南半圆区	X	Y	H中心点	4000000	500000	45右点	4000000	504000	45跑道南延长线过点	3996000	500000	45左点	4000000	496000	45注：中心点为半圆的中心点，圆弧经过右点、跑道南延长线过点和左点。36机场过渡面R	X	Y	HP1	4003860	500150	0P2	4003860	500464.6853	45P3	3997842.098	500464.6853	45P4	3999940	500150	036机场过渡面L	X	Y	HP1	4003860	499535.3147	45P2	4003860	499850	0P3	3999940	499850	0P4	3997842.098	499535.3147	4536机场进近面1	X	Y	HP1	3999940	499850	0P2	3999940	500150	0P3	3996940	500600	60P4	3996940	499400	6036机场进近面2	X	Y	HP1	3996940	499400	60P2	3996940	500600	60P3	3993340	501140	150P4	3993340	498860	15036机场进近面3	X	Y	HP1	3993340	498860	150P2	3993340	501140	150P3	3984940	502400	150P4	3984940	497600	15018起飞爬升面	X	Y	HP1	3999940	499910	0P2	3999940	500090	0P3	3984940	501965	300P4	3984940	498035	300锥形面北区	X	Y	H圆心	4003800	500000	P1	4003800	494000	145P2	4009800	500000	145P3	4003800	506000	145P4	4003800	504000	45P5	4007800	500000	45P6	4003800	496000	45注：此区域由两段同心圆弧组成。半径分别为4000米和6000米。锥形面东区	X	Y	HP1	4003800	504000	45P2	4003800	506000	145P3	4000000	506000	145P4	4000000	504000	45锥形面南区	X	Y	H圆心	4000000	500000	P1	4000000	494000	145P2	4000000	496000	45P3	3996000	500000	45P4	4000000	504000	45P5	4000000	506000	145P6	3994000	500000	145注：此区域由两段同心圆弧组成。半径分别为4000米和6000米。锥形面西区	X	Y	HP1	4003800	494000	145P2	4003800	496000	45P3	4000000	496000	45P4	4000000	494000	145RNP最后进近保护区主区1	X	Y	YP1	4000000	499120	52P2	4000000	500880	52P3	3993000	500880	52P4	3993000	499120	52RNP最后进近保护区副区1R	X	Y	YP1	4000000	500880	52P2	4000000	501760	95P3	3993000	501760	95P4	3993000	500880	52RNP最后进近保护区副区1L	X	Y	YP1	4000000	498240	95P2	4000000	499120	52P3	3993000	499120	52P4	3993000	498240	95RNP最后进近保护区主区2	X	Y	YP1	3993000	499120	201P2	3993000	500880	201P3	3983700	500880	201P4	3983700	499120	201RNP最后进近保护区副区2R	X	Y	YP1	3993000	500880	201P2	3993000	501760	250P3	3983700	501760	250P4	3983700	500880	201RNP最后进近保护区副区2L	X	Y	YP1	3993000	498240	250P2	3993000	499120	201P3	3983700	499120	201P4	3983700	498240	25036LOC保护区	X	Y	HP1	4004107	500000	0P2	4001107	500528.9809	15P3	4001107	499471.0191	1536下滑台保护区A区	X	Y	HP1	4000300	499845	0P2	4000300	499970	0P3	3999940	499970	0P4	3999940	499815	036下滑台保护区B区	X	Y	HP1	3999940	499815	0P2	3999940	499970	0P3	3999400	499970	0P4	3999400	499815	036下滑台保护区C1区	X	Y	HP1	4000300	499755	0P2	4000300	499845	0P3	3999940	499815	0P4	3999940	499755	036下滑台保护区C2区	X	Y	HP1	3999940	499755	0P2	3999940	499815	0P3	3999400	499815	0P4	3999400	499755	036下滑台信号覆盖区	X	Y	HP1	4000300	499875	0P2	3981800	502476	435.976P3	3981800	497274	435.976';

  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role,
      parts: msg.parts.map(part => part.text).join(''), 
    })),
    generationConfig: {
      maxOutputTokens: 8000,
    },
    safetySettings: [
      {category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE'},
      {category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE'},
      {category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE'},
      {category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE'}
    ],
    // 将默认的 prompt 添加到历史记录中
    prompt: defaultPrompt,
  });

  // Use sendMessageStream for streaming responses
  const result = await chat.sendMessageStream(newMessage);

  const encodedStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const chunk of result.stream) {
        const text = await chunk.text();
        const encoded = encoder.encode(text);
        controller.enqueue(encoded);
      }
      controller.close();
    },
  });

  return encodedStream;
}


