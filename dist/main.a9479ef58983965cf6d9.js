(()=>{"use strict";var e,o={268:(e,o,t)=>{var r=t(6540),a=t.n(r),i=t(5338),s=t(2896),n=t(2242),l=t(9859);const d=(0,n.Z0)({name:"songs",initialState:{songs:[],currentPage:1,totalPages:1,totalSongs:0,pageSize:10,loading:!1,error:null,selectedSong:null,filters:{search:"",artist:"",album:"",year:""}},reducers:{fetchSongsRequest:(e,o)=>{e.loading=!0,e.error=null},fetchSongsSuccess:(e,o)=>{e.loading=!1,e.songs=o.payload.songs,e.totalPages=o.payload.totalPages,e.totalSongs=o.payload.totalSongs,e.currentPage=o.payload.currentPage},fetchSongsFailure:(e,o)=>{e.loading=!1,e.error=o.payload},createSongRequest:(e,o)=>{e.loading=!0,e.error=null},createSongSuccess:(e,o)=>{e.loading=!1,e.songs.unshift(o.payload),e.totalSongs+=1},createSongFailure:(e,o)=>{e.loading=!1,e.error=o.payload},updateSongRequest:(e,o)=>{e.loading=!0,e.error=null},updateSongSuccess:(e,o)=>{e.loading=!1;const t=e.songs.findIndex(e=>e.id===o.payload.id);-1!==t&&(e.songs[t]=o.payload)},updateSongFailure:(e,o)=>{e.loading=!1,e.error=o.payload},deleteSongRequest:(e,o)=>{e.loading=!0,e.error=null},deleteSongSuccess:(e,o)=>{e.loading=!1,e.songs=e.songs.filter(e=>e.id!==o.payload),e.totalSongs-=1},deleteSongFailure:(e,o)=>{e.loading=!1,e.error=o.payload},setCurrentPage:(e,o)=>{e.currentPage=o.payload},setPageSize:(e,o)=>{e.pageSize=o.payload,e.currentPage=1},setFilters:(e,o)=>{e.filters={...e.filters,...o.payload},e.currentPage=1},setSelectedSong:(e,o)=>{e.selectedSong=o.payload},clearError:e=>{e.error=null}}}),{fetchSongsRequest:c,fetchSongsSuccess:h,fetchSongsFailure:p,createSongRequest:m,createSongSuccess:g,createSongFailure:u,updateSongRequest:x,updateSongSuccess:f,updateSongFailure:b,deleteSongRequest:y,deleteSongSuccess:$,deleteSongFailure:w,setCurrentPage:j,setPageSize:v,setFilters:S,setSelectedSong:A,clearError:z}=d.actions,k=d.reducer,C=(0,n.Z0)({name:"ui",initialState:{isCreateModalOpen:!1,isEditModalOpen:!1,isDeleteModalOpen:!1,isSongDetailsModalOpen:!1,notifications:[],selectedSong:null},reducers:{openCreateModal:e=>{e.isCreateModalOpen=!0},closeCreateModal:e=>{e.isCreateModalOpen=!1},openEditModal:e=>{e.isEditModalOpen=!0},closeEditModal:e=>{e.isEditModalOpen=!1},openDeleteModal:e=>{e.isDeleteModalOpen=!0},closeDeleteModal:e=>{e.isDeleteModalOpen=!1},openSongDetailsModal:(e,o)=>{e.isSongDetailsModalOpen=!0,e.selectedSong=o.payload},closeSongDetailsModal:e=>{e.isSongDetailsModalOpen=!1,e.selectedSong=null},addNotification:(e,o)=>{e.notifications.push({id:Date.now(),...o.payload})},removeNotification:(e,o)=>{e.notifications=e.notifications.filter(e=>e.id!==o.payload)}}}),{openCreateModal:E,closeCreateModal:M,openEditModal:O,closeEditModal:D,openDeleteModal:F,closeDeleteModal:Y,openSongDetailsModal:W,closeSongDetailsModal:T,addNotification:P,removeNotification:H}=C.actions,U=C.reducer;var q=t(3786);const J=t(1083).A.create({baseURL:"http://localhost:3002/api",headers:{"Content-Type":"application/json"}});J.interceptors.request.use(e=>e,e=>Promise.reject(e)),J.interceptors.response.use(e=>e.data,e=>{const o=e.response?.data?.message||e.message||"An error occurred";return Promise.reject(new Error(o))});const I=async({page:e=1,pageSize:o=10,filters:t={}}={})=>{const r=new URLSearchParams({page:e.toString(),limit:o.toString(),...Object.fromEntries(Object.entries(t).filter(([e,o])=>o&&""!==o.trim()))});return J.get(`/songs?${r}`)},L=async e=>J.post("/songs",e),R=async(e,o)=>J.put(`/songs/${e}`,o),N=async e=>J.delete(`/songs/${e}`);function*B(e){try{const{page:o,pageSize:t,filters:r}=e.payload||{},a=yield(0,q.T1)(I,{page:o,pageSize:t,filters:r});yield(0,q.yJ)(h(a))}catch(e){yield(0,q.yJ)(p(e.message)),yield(0,q.yJ)(P({type:"error",message:"Failed to fetch songs"}))}}function*G(e){try{const o=yield(0,q.T1)(L,e.payload);yield(0,q.yJ)(g(o)),yield(0,q.yJ)(M()),yield(0,q.yJ)(P({type:"success",message:"Song created successfully"}));const t=yield(0,q.Lt)(),{currentPage:r,pageSize:a,filters:i}=t.songs;yield(0,q.yJ)(c({page:r,pageSize:a,filters:i}))}catch(e){yield(0,q.yJ)(u(e.message)),yield(0,q.yJ)(P({type:"error",message:"Failed to create song"}))}}function*_(e){try{const o=yield(0,q.T1)(R,e.payload.id,e.payload.data);yield(0,q.yJ)(f(o)),yield(0,q.yJ)(D()),yield(0,q.yJ)(P({type:"success",message:"Song updated successfully"}));const t=yield(0,q.Lt)(),{currentPage:r,pageSize:a,filters:i}=t.songs;yield(0,q.yJ)(c({page:r,pageSize:a,filters:i}))}catch(e){yield(0,q.yJ)(b(e.message)),yield(0,q.yJ)(P({type:"error",message:"Failed to update song"}))}}function*K(e){try{yield(0,q.T1)(N,e.payload),yield(0,q.yJ)($(e.payload)),yield(0,q.yJ)(Y()),yield(0,q.yJ)(P({type:"success",message:"Song deleted successfully"}));const o=yield(0,q.Lt)(),{currentPage:t,pageSize:r,filters:a}=o.songs;yield(0,q.yJ)(c({page:t,pageSize:r,filters:a}))}catch(e){yield(0,q.yJ)(w(e.message)),yield(0,q.yJ)(P({type:"error",message:"Failed to delete song"}))}}function*Z(){yield(0,q.jP)(c.type,B),yield(0,q.jP)(m.type,G),yield(0,q.jP)(x.type,_),yield(0,q.jP)(y.type,K)}const Q=(0,l.Ay)(),X=(0,n.U1)({reducer:{songs:k,ui:U},middleware:e=>e({thunk:!1,serializableCheck:{ignoredActions:["persist/PERSIST"]}}).concat(Q),devTools:!0});Q.run(function*(){yield(0,q.Q7)([Z()])});var V=t(8221);const ee={colors:{primary:{50:"#fef7ee",100:"#fdedd3",200:"#fbd7a5",300:"#f8bc6d",400:"#f59532",500:"#f3770a",600:"#e45c00",700:"#bd4502",800:"#973608",900:"#7c2d0a"},secondary:{50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d"},gray:{25:"#fcfcfd",50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d"},white:"#ffffff",black:"#000000"},fonts:{body:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',heading:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',mono:'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'},fontSizes:{xs:"0.75rem",sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem","5xl":"3rem"},fontWeights:{normal:400,medium:500,semibold:600,bold:700},lineHeights:{tight:1.25,normal:1.5,relaxed:1.75},space:[0,4,8,12,16,20,24,32,40,48,56,64],sizes:{container:{sm:"640px",md:"768px",lg:"1024px",xl:"1280px"}},radii:{none:"0",sm:"0.125rem",base:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem","2xl":"1rem",full:"9999px"},shadows:{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",base:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",md:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",lg:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",xl:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"},breakpoints:["640px","768px","1024px","1280px"]};var oe=t(7437),te=t(4848);const re=()=>(0,te.jsx)(oe.mL,{styles:oe.AH`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@100;200;300;400;500;600;700;800;900&display=swap');

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        font-size: 16px;
        line-height: 1.5;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        background-color: #ffffff;
        color: #111827;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      #root {
        min-height: 100vh;
      }

      button {
        font-family: inherit;
        cursor: pointer;
        border: none;
        background: none;
      }

      input, textarea, select {
        font-family: inherit;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      ul, ol {
        list-style: none;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f5f9;
      }

      ::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }

      /* Focus styles */
      *:focus {
        outline: 2px solid #f59532;
        outline-offset: 2px;
      }

      /* Animation utilities */
      .fade-in {
        animation: fadeIn 0.2s ease-in-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .slide-up {
        animation: slideUp 0.3s ease-out;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `});var ae=t(1479);const ie=ae.A.header`
  background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
  padding: ${e=>e.theme.space[8]}px ${e=>e.theme.space[6]}px ${e=>e.theme.space[10]}px;
  text-align: center;
  border-bottom: 1px solid ${e=>e.theme.colors.gray[100]};
`,se=ae.A.div`
  max-width: ${e=>e.theme.sizes.container.lg};
  margin: 0 auto;
`,ne=ae.A.h1`
  font-size: 4.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, ${e=>e.theme.colors.gray[900]} 0%, ${e=>e.theme.colors.gray[700]} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${e=>e.theme.space[3]}px 0;
  letter-spacing: -0.03em;
  line-height: 1.1;
  
  @media (max-width: ${e=>e.theme.breakpoints[1]}) {
    font-size: 3.5rem;
  }
  
  @media (max-width: ${e=>e.theme.breakpoints[0]}) {
    font-size: 2.5rem;
  }
`,le=ae.A.h2`
  font-size: 2.25rem;
  font-weight: 500;
  color: ${e=>e.theme.colors.primary[600]};
  margin: 0 0 ${e=>e.theme.space[8]}px 0;
  font-family: 'Noto Sans Ethiopic', serif;
  opacity: 0.9;
  
  @media (max-width: ${e=>e.theme.breakpoints[1]}) {
    font-size: 2rem;
  }
  
  @media (max-width: ${e=>e.theme.breakpoints[0]}) {
    font-size: 1.5rem;
  }
`,de=ae.A.p`
  font-size: ${e=>e.theme.fontSizes.xl};
  color: ${e=>e.theme.colors.gray[600]};
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;
  font-weight: 400;
  
  @media (max-width: ${e=>e.theme.breakpoints[0]}) {
    font-size: ${e=>e.theme.fontSizes.lg};
    line-height: 1.6;
  }
`,ce=()=>(0,te.jsx)(ie,{children:(0,te.jsxs)(se,{children:[(0,te.jsx)(ne,{children:"Ethiopop Archive"}),(0,te.jsx)(le,{children:"የኢትዮጵያ ሙዚቃ ማህደር"}),(0,te.jsx)(de,{children:"Discover the rich musical heritage of Ethiopia. From traditional folk songs to modern Ethio-Jazz fusion, explore the stories, artists, and cultural significance behind each piece."})]})}),he=ae.A.div`
  position: fixed;
  top: ${e=>e.theme.space[4]}px;
  right: ${e=>e.theme.space[4]}px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space[3]}px;
  max-width: 400px;
`,pe=ae.A.div`
  padding: ${e=>e.theme.space[4]}px;
  border-radius: ${e=>e.theme.radii.lg};
  border: 1px solid;
  box-shadow: ${e=>e.theme.shadows.lg};
  display: flex;
  align-items: flex-start;
  gap: ${e=>e.theme.space[3]}px;
  animation: slideIn 0.3s ease-out;
  position: relative;
  
  &::before {
    font-weight: ${e=>e.theme.fontWeights.bold};
    font-size: ${e=>e.theme.fontSizes.lg};
  }
  
  ${e=>((e,o)=>{const t={success:oe.AH`
      background-color: ${o.colors.secondary[50]};
      border-color: ${o.colors.secondary[200]};
      color: ${o.colors.secondary[800]};
      
      &::before {
        content: '✓';
        color: ${o.colors.secondary[600]};
      }
    `,error:oe.AH`
      background-color: ${o.colors.red[50]};
      border-color: ${o.colors.red[200]};
      color: ${o.colors.red[800]};
      
      &::before {
        content: '✕';
        color: ${o.colors.red[600]};
      }
    `,warning:oe.AH`
      background-color: ${o.colors.primary[50]};
      border-color: ${o.colors.primary[200]};
      color: ${o.colors.primary[800]};
      
      &::before {
        content: '⚠';
        color: ${o.colors.primary[600]};
      }
    `,info:oe.AH`
      background-color: ${o.colors.gray[50]};
      border-color: ${o.colors.gray[200]};
      color: ${o.colors.gray[800]};
      
      &::before {
        content: 'ℹ';
        color: ${o.colors.gray[600]};
      }
    `};return t[e]||t.info})(e.type,e.theme)}
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`,me=ae.A.div`
  flex: 1;
`,ge=ae.A.p`
  margin: 0;
  font-size: ${e=>e.theme.fontSizes.sm};
  font-weight: ${e=>e.theme.fontWeights.medium};
`,ue=ae.A.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: ${e=>e.theme.fontSizes.lg};
  padding: 0;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`,xe=({notification:e,onClose:o})=>((0,r.useEffect)(()=>{const t=setTimeout(()=>{o(e.id)},e.duration||5e3);return()=>clearTimeout(t)},[e.id,e.duration,o]),(0,te.jsxs)(pe,{type:e.type,children:[(0,te.jsx)(me,{children:(0,te.jsx)(ge,{children:e.message})}),(0,te.jsx)(ue,{onClick:()=>o(e.id),children:"×"})]})),fe=()=>{const e=(0,s.wA)(),o=(0,s.d4)(e=>e.ui.notifications),t=o=>{e(H(o))};return 0===o.length?null:(0,te.jsx)(he,{children:o.map(e=>(0,te.jsx)(xe,{notification:e,onClose:t},e.id))})},be=ae.A.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${e=>e.theme.colors.white};
`,ye=ae.A.main`
  flex: 1;
  padding: ${e=>e.theme.space[8]}px ${e=>e.theme.space[6]}px;
  max-width: ${e=>e.theme.sizes.container.xl};
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${e=>e.theme.breakpoints[0]}) {
    padding: ${e=>e.theme.space[6]}px ${e=>e.theme.space[4]}px;
  }
`,$e=({children:e})=>{const o=(0,s.d4)(e=>e.ui.notifications);return(0,te.jsxs)(be,{children:[(0,te.jsx)(ce,{}),(0,te.jsx)(ye,{children:e}),o.length>0&&(0,te.jsx)(fe,{})]})},we=ae.A.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.space[2]}px;
  font-weight: ${e=>e.theme.fontWeights.medium};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  white-space: nowrap;
  
  ${e=>((e,o)=>{const t={primary:oe.AH`
      background: linear-gradient(135deg, ${o.colors.primary[500]} 0%, ${o.colors.primary[600]} 100%);
      color: ${o.colors.white};
      border: 1px solid ${o.colors.primary[500]};
      box-shadow: 0 2px 4px 0 rgba(245, 149, 50, 0.2);
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, ${o.colors.primary[600]} 0%, ${o.colors.primary[700]} 100%);
        border-color: ${o.colors.primary[600]};
        box-shadow: 0 4px 8px 0 rgba(245, 149, 50, 0.3);
        transform: translateY(-1px);
      }
      
      &:active:not(:disabled) {
        background: linear-gradient(135deg, ${o.colors.primary[700]} 0%, ${o.colors.primary[800]} 100%);
        transform: translateY(0);
        box-shadow: 0 2px 4px 0 rgba(245, 149, 50, 0.2);
      }
    `,secondary:oe.AH`
      background-color: ${o.colors.white};
      color: ${o.colors.gray[700]};
      border: 1px solid ${o.colors.gray[300]};
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      
      &:hover:not(:disabled) {
        background-color: ${o.colors.gray[50]};
        border-color: ${o.colors.gray[400]};
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
      }
      
      &:active:not(:disabled) {
        background-color: ${o.colors.gray[100]};
        transform: translateY(0);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }
    `,danger:oe.AH`
      background: linear-gradient(135deg, ${o.colors.red[500]} 0%, ${o.colors.red[600]} 100%);
      color: ${o.colors.white};
      border: 1px solid ${o.colors.red[500]};
      box-shadow: 0 2px 4px 0 rgba(239, 68, 68, 0.2);
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, ${o.colors.red[600]} 0%, ${o.colors.red[700]} 100%);
        border-color: ${o.colors.red[600]};
        box-shadow: 0 4px 8px 0 rgba(239, 68, 68, 0.3);
        transform: translateY(-1px);
      }
      
      &:active:not(:disabled) {
        background: linear-gradient(135deg, ${o.colors.red[700]} 0%, ${o.colors.red[800]} 100%);
        transform: translateY(0);
        box-shadow: 0 2px 4px 0 rgba(239, 68, 68, 0.2);
      }
    `,ghost:oe.AH`
      background-color: transparent;
      color: ${o.colors.gray[600]};
      border: 1px solid transparent;
      
      &:hover:not(:disabled) {
        background-color: ${o.colors.gray[100]};
        color: ${o.colors.gray[700]};
        transform: translateY(-1px);
      }
      
      &:active:not(:disabled) {
        background-color: ${o.colors.gray[200]};
        transform: translateY(0);
      }
    `};return t[e]||t.primary})(e.variant,e.theme)}
  ${e=>((e,o)=>{const t={sm:oe.AH`
      padding: ${o.space[2]}px ${o.space[3]}px;
      font-size: ${o.fontSizes.sm};
      border-radius: ${o.radii.md};
    `,md:oe.AH`
      padding: ${o.space[3]}px ${o.space[4]}px;
      font-size: ${o.fontSizes.base};
      border-radius: ${o.radii.md};
    `,lg:oe.AH`
      padding: ${o.space[4]}px ${o.space[6]}px;
      font-size: ${o.fontSizes.lg};
      border-radius: ${o.radii.lg};
    `};return t[e]||t.md})(e.size,e.theme)}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: 2px solid ${e=>e.theme.colors.primary[500]};
    outline-offset: 2px;
  }
  
  ${e=>e.fullWidth&&oe.AH`
    width: 100%;
  `}
`,je=({children:e,variant:o="primary",size:t="md",fullWidth:r=!1,disabled:a=!1,loading:i=!1,onClick:s,type:n="button",...l})=>(0,te.jsxs)(we,{variant:o,size:t,fullWidth:r,disabled:a||i,onClick:s,type:n,...l,children:[i&&(0,te.jsx)("span",{children:"⏳"}),e]}),ve=ae.A.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${e=>e.theme.space[4]}px;
  margin-bottom: ${e=>e.theme.space[6]}px;
`,Se=ae.A.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space[2]}px;
`,Ae=ae.A.h2`
  font-size: ${e=>e.theme.fontSizes["2xl"]};
  font-weight: ${e=>e.theme.fontWeights.semibold};
  color: ${e=>e.theme.colors.gray[900]};
  margin: 0;
`,ze=ae.A.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space[4]}px;
  font-size: ${e=>e.theme.fontSizes.sm};
  color: ${e=>e.theme.colors.gray[600]};
`,ke=ae.A.div`
  display: flex;
  align-items: center;
`,Ce=()=>{const e=(0,s.wA)(),{totalSongs:o,loading:t}=(0,s.d4)(e=>e.songs);return(0,te.jsxs)(ve,{children:[(0,te.jsxs)(Se,{children:[(0,te.jsx)(Ae,{children:"Music Collection"}),(0,te.jsxs)(ze,{children:[(0,te.jsxs)("span",{children:["Total Songs: ",o]}),t&&(0,te.jsx)("span",{children:"Loading..."})]})]}),(0,te.jsx)(ke,{children:(0,te.jsx)(je,{onClick:()=>{e(E())},children:"Add New Song"})})]})},Ee=ae.A.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space[2]}px;
`,Me=ae.A.label`
  font-size: ${e=>e.theme.fontSizes.sm};
  font-weight: ${e=>e.theme.fontWeights.medium};
  color: ${e=>e.theme.colors.gray[700]};
`,Oe=ae.A.input`
  padding: ${e=>e.theme.space[3]}px ${e=>e.theme.space[4]}px;
  border: 1px solid ${e=>e.theme.colors.gray[300]};
  border-radius: ${e=>e.theme.radii.lg};
  font-size: ${e=>e.theme.fontSizes.base};
  transition: all 0.2s ease;
  background-color: ${e=>e.theme.colors.white};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${e=>e.theme.colors.primary[100]}, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }
  
  &:hover:not(:focus):not(:disabled) {
    border-color: ${e=>e.theme.colors.gray[400]};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: ${e=>e.theme.colors.gray[50]};
    color: ${e=>e.theme.colors.gray[500]};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${e=>e.theme.colors.gray[400]};
  }
  
  ${e=>e.error&&oe.AH`
    border-color: ${e.theme.colors.red[500]};
    
    &:focus {
      border-color: ${e.theme.colors.red[500]};
      box-shadow: 0 0 0 3px ${e.theme.colors.red[100]}, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
  `}
`,De=ae.A.textarea`
  padding: ${e=>e.theme.space[3]}px ${e=>e.theme.space[4]}px;
  border: 1px solid ${e=>e.theme.colors.gray[300]};
  border-radius: ${e=>e.theme.radii.md};
  font-size: ${e=>e.theme.fontSizes.base};
  font-family: inherit;
  transition: all 0.2s ease;
  background-color: ${e=>e.theme.colors.white};
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${e=>e.theme.colors.primary[100]};
  }
  
  &:disabled {
    background-color: ${e=>e.theme.colors.gray[50]};
    color: ${e=>e.theme.colors.gray[500]};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${e=>e.theme.colors.gray[400]};
  }
  
  ${e=>e.error&&oe.AH`
    border-color: ${e.theme.colors.red[500]};
    
    &:focus {
      border-color: ${e.theme.colors.red[500]};
      box-shadow: 0 0 0 3px ${e.theme.colors.red[100]};
    }
  `}
`,Fe=ae.A.span`
  font-size: ${e=>e.theme.fontSizes.sm};
  color: ${e=>e.theme.colors.red[600]};
`,Ye=({label:e,error:o,type:t="text",multiline:r=!1,rows:a=4,...i})=>{const s=r?De:Oe;return(0,te.jsxs)(Ee,{children:[e&&(0,te.jsx)(Me,{children:e}),(0,te.jsx)(s,{type:r?void 0:t,rows:r?a:void 0,error:o,...i}),o&&(0,te.jsx)(Fe,{children:o})]})},We=ae.A.div`
  background: ${e=>e.theme.colors.white};
  border: 1px solid ${e=>e.theme.colors.gray[200]};
  border-radius: ${e=>e.theme.radii.xl};
  padding: ${e=>e.theme.space[6]}px;
  margin-bottom: ${e=>e.theme.space[8]}px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
`,Te=ae.A.h3`
  font-size: ${e=>e.theme.fontSizes.lg};
  font-weight: ${e=>e.theme.fontWeights.semibold};
  color: ${e=>e.theme.colors.gray[900]};
  margin: 0 0 ${e=>e.theme.space[5]}px 0;
`,Pe=ae.A.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${e=>e.theme.space[5]}px;
  margin-bottom: ${e=>e.theme.space[6]}px;
`,He=ae.A.div`
  display: flex;
  gap: ${e=>e.theme.space[3]}px;
  justify-content: flex-end;
  padding-top: ${e=>e.theme.space[4]}px;
  border-top: 1px solid ${e=>e.theme.colors.gray[100]};
`,Ue=()=>{const e=(0,s.wA)(),{filters:o}=(0,s.d4)(e=>e.songs),[t,a]=(0,r.useState)(o),i=(e,o)=>{a(t=>({...t,[e]:o}))},n=Object.values(o).some(e=>e&&""!==e.trim());return(0,te.jsxs)(We,{children:[(0,te.jsx)(Te,{children:"Filter Songs"}),(0,te.jsxs)(Pe,{children:[(0,te.jsx)(Ye,{label:"Search",placeholder:"Search songs or artists...",value:t.search,onChange:e=>i("search",e.target.value)}),(0,te.jsx)(Ye,{label:"Artist",placeholder:"Filter by artist...",value:t.artist,onChange:e=>i("artist",e.target.value)}),(0,te.jsx)(Ye,{label:"Album",placeholder:"Filter by album...",value:t.album,onChange:e=>i("album",e.target.value)}),(0,te.jsx)(Ye,{label:"Year",placeholder:"Filter by year...",type:"number",value:t.year,onChange:e=>i("year",e.target.value)})]}),(0,te.jsxs)(He,{children:[(0,te.jsx)(je,{variant:"secondary",onClick:()=>{const o={search:"",artist:"",album:"",year:""};a(o),e(S(o))},disabled:!n,children:"Clear Filters"}),(0,te.jsx)(je,{onClick:()=>{e(S(t))},children:"Apply Filters"})]})]})},qe=ae.A.div`
  background: ${e=>e.theme.colors.white};
  border: 1px solid ${e=>e.theme.colors.gray[200]};
  border-radius: ${e=>e.theme.radii.xl};
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
`,Je=ae.A.table`
  width: 100%;
  border-collapse: collapse;
`,Ie=ae.A.thead`
  background: linear-gradient(135deg, ${e=>e.theme.colors.gray[50]} 0%, ${e=>e.theme.colors.gray[25]} 100%);
`,Le=ae.A.th`
  padding: ${e=>e.theme.space[5]}px ${e=>e.theme.space[4]}px;
  text-align: left;
  font-weight: ${e=>e.theme.fontWeights.semibold};
  color: ${e=>e.theme.colors.gray[700]};
  font-size: ${e=>e.theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  border-bottom: 2px solid ${e=>e.theme.colors.gray[200]};
  
  &:first-of-type {
    padding-left: ${e=>e.theme.space[6]}px;
  }
  
  &:last-of-type {
    padding-right: ${e=>e.theme.space[6]}px;
  }
`,Re=ae.A.tbody``,Ne=ae.A.tr`
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background-color: ${e=>e.theme.colors.gray[25]};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${e=>e.theme.colors.gray[100]};
  }
`,Be=ae.A.td`
  padding: ${e=>e.theme.space[5]}px ${e=>e.theme.space[4]}px;
  font-size: ${e=>e.theme.fontSizes.sm};
  color: ${e=>e.theme.colors.gray[900]};
  vertical-align: middle;
  
  &:first-of-type {
    padding-left: ${e=>e.theme.space[6]}px;
  }
  
  &:last-of-type {
    padding-right: ${e=>e.theme.space[6]}px;
  }
`,Ge=ae.A.div`
  font-weight: ${e=>e.theme.fontWeights.semibold};
  color: ${e=>e.theme.colors.gray[900]};
  font-size: ${e=>e.theme.fontSizes.base};
  margin-bottom: ${e=>e.theme.space[1]}px;
`,_e=ae.A.div`
  color: ${e=>e.theme.colors.gray[600]};
  font-size: ${e=>e.theme.fontSizes.sm};
  font-weight: ${e=>e.theme.fontWeights.medium};
`,Ke=ae.A.span`
  display: inline-block;
  padding: ${e=>e.theme.space[1]}px ${e=>e.theme.space[3]}px;
  background-color: ${e=>e.theme.colors.primary[100]};
  color: ${e=>e.theme.colors.primary[700]};
  border-radius: ${e=>e.theme.radii.full};
  font-size: ${e=>e.theme.fontSizes.xs};
  font-weight: ${e=>e.theme.fontWeights.medium};
`,Ze=ae.A.span`
  display: inline-block;
  padding: ${e=>e.theme.space[1]}px ${e=>e.theme.space[3]}px;
  background-color: ${e=>e.theme.colors.secondary[100]};
  color: ${e=>e.theme.colors.secondary[700]};
  border-radius: ${e=>e.theme.radii.full};
  font-size: ${e=>e.theme.fontSizes.xs};
  font-weight: ${e=>e.theme.fontWeights.medium};
`,Qe=ae.A.div`
  display: flex;
  gap: ${e=>e.theme.space[2]}px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  tr:hover & {
    opacity: 1;
  }
`,Xe=ae.A.div`
  text-align: center;
  padding: ${e=>e.theme.space[12]}px ${e=>e.theme.space[6]}px;
  color: ${e=>e.theme.colors.gray[500]};
  
  h3 {
    font-size: ${e=>e.theme.fontSizes.xl};
    font-weight: ${e=>e.theme.fontWeights.semibold};
    color: ${e=>e.theme.colors.gray[700]};
    margin-bottom: ${e=>e.theme.space[2]}px;
  }
  
  p {
    font-size: ${e=>e.theme.fontSizes.base};
    color: ${e=>e.theme.colors.gray[500]};
  }
`,Ve=ae.A.div`
  text-align: center;
  padding: ${e=>e.theme.space[12]}px ${e=>e.theme.space[6]}px;
  color: ${e=>e.theme.colors.gray[500]};
  font-size: ${e=>e.theme.fontSizes.lg};
`,eo=()=>{const e=(0,s.wA)(),{songs:o,loading:t}=(0,s.d4)(e=>e.songs);return t?(0,te.jsx)(qe,{children:(0,te.jsx)(Ve,{children:"Loading songs..."})}):0===o.length?(0,te.jsx)(qe,{children:(0,te.jsxs)(Xe,{children:[(0,te.jsx)("h3",{children:"No songs found"}),(0,te.jsx)("p",{children:"Add your first song to get started!"})]})}):(0,te.jsx)(qe,{children:(0,te.jsxs)(Je,{children:[(0,te.jsx)(Ie,{children:(0,te.jsxs)("tr",{children:[(0,te.jsx)(Le,{children:"Song"}),(0,te.jsx)(Le,{children:"Album"}),(0,te.jsx)(Le,{children:"Year"}),(0,te.jsx)(Le,{children:"Genre"}),(0,te.jsx)(Le,{children:"Duration"}),(0,te.jsx)(Le,{children:"Language"}),(0,te.jsx)(Le,{children:"Actions"})]})}),(0,te.jsx)(Re,{children:o.map(o=>{return(0,te.jsxs)(Ne,{onClick:t=>((o,t)=>{t.target.closest("button")||e(W(o))})(o,t),children:[(0,te.jsxs)(Be,{children:[(0,te.jsx)(Ge,{children:o.title}),(0,te.jsx)(_e,{children:o.artist})]}),(0,te.jsx)(Be,{children:o.album}),(0,te.jsx)(Be,{children:o.year}),(0,te.jsx)(Be,{children:(0,te.jsx)(Ke,{children:o.genre})}),(0,te.jsx)(Be,{children:(t=o.duration,`${Math.floor(t/60)}:${(t%60).toString().padStart(2,"0")}`)}),(0,te.jsx)(Be,{children:(0,te.jsx)(Ze,{children:o.language})}),(0,te.jsx)(Be,{children:(0,te.jsxs)(Qe,{children:[(0,te.jsx)(je,{size:"sm",variant:"secondary",onClick:()=>(o=>{e(A(o)),e(O())})(o),children:"Edit"}),(0,te.jsx)(je,{size:"sm",variant:"danger",onClick:()=>(o=>{e(A(o)),e(F())})(o),children:"Delete"})]})})]},o.id);var t})})]})})};var oo=t(961);const to=ae.A.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${e=>e.theme.space[4]}px;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,ro=ae.A.div`
  background-color: ${e=>e.theme.colors.white};
  border-radius: ${e=>e.theme.radii.xl};
  box-shadow: ${e=>e.theme.shadows.xl};
  max-width: ${e=>e.maxWidth||"500px"};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`,ao=ae.A.div`
  padding: ${e=>e.theme.space[6]}px ${e=>e.theme.space[6]}px ${e=>e.theme.space[4]}px;
  border-bottom: 1px solid ${e=>e.theme.colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`,io=ae.A.h2`
  font-size: ${e=>e.theme.fontSizes.xl};
  font-weight: ${e=>e.theme.fontWeights.semibold};
  color: ${e=>e.theme.colors.gray[900]};
  margin: 0;
`,so=ae.A.button`
  background: none;
  border: none;
  font-size: ${e=>e.theme.fontSizes.xl};
  color: ${e=>e.theme.colors.gray[400]};
  cursor: pointer;
  padding: ${e=>e.theme.space[1]}px;
  border-radius: ${e=>e.theme.radii.md};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${e=>e.theme.colors.gray[600]};
  }
`,no=ae.A.div`
  padding: ${e=>e.theme.space[6]}px;
`,lo=ae.A.div`
  padding: ${e=>e.theme.space[4]}px ${e=>e.theme.space[6]}px ${e=>e.theme.space[6]}px;
  border-top: 1px solid ${e=>e.theme.colors.gray[200]};
  display: flex;
  gap: ${e=>e.theme.space[3]}px;
  justify-content: flex-end;
`,co=({isOpen:e,onClose:o,title:t,children:a,footer:i,maxWidth:s,closeOnOverlayClick:n=!0})=>((0,r.useEffect)(()=>(document.body.style.overflow=e?"hidden":"unset",()=>{document.body.style.overflow="unset"}),[e]),(0,r.useEffect)(()=>{const t=t=>{"Escape"===t.key&&e&&o()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[e,o]),e?(0,oo.createPortal)((0,te.jsx)(to,{onClick:e=>{e.target===e.currentTarget&&n&&o()},children:(0,te.jsxs)(ro,{maxWidth:s,children:[t&&(0,te.jsxs)(ao,{children:[(0,te.jsx)(io,{children:t}),(0,te.jsx)(so,{onClick:o,children:"×"})]}),(0,te.jsx)(no,{children:a}),i&&(0,te.jsx)(lo,{children:i})]})}),document.body):null),ho=ae.A.form`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space[4]}px;
`,po=ae.A.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space[4]}px;
  
  @media (max-width: ${e=>e.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
  }
`,mo=ae.A.select`
  padding: ${e=>e.theme.space[3]}px ${e=>e.theme.space[4]}px;
  border: 1px solid ${e=>e.theme.colors.gray[300]};
  border-radius: ${e=>e.theme.radii.md};
  font-size: ${e=>e.theme.fontSizes.base};
  background-color: ${e=>e.theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${e=>e.theme.colors.primary[100]};
  }
  
  &:disabled {
    background-color: ${e=>e.theme.colors.gray[50]};
    color: ${e=>e.theme.colors.gray[500]};
    cursor: not-allowed;
  }
`,go=ae.A.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space[2]}px;
`,uo=ae.A.label`
  font-size: ${e=>e.theme.fontSizes.sm};
  font-weight: ${e=>e.theme.fontWeights.medium};
  color: ${e=>e.theme.colors.gray[700]};
`,xo=ae.A.span`
  font-size: ${e=>e.theme.fontSizes.sm};
  color: ${e=>e.theme.colors.red[600]};
`,fo=({id:e,formData:o,setFormData:t,errors:r,onSubmit:a})=>{const i=(e,o)=>{t(t=>({...t,[e]:o}))};return(0,te.jsxs)(ho,{id:e,onSubmit:a,children:[(0,te.jsx)(Ye,{label:"Song Title",placeholder:"Enter song title...",value:o.title,onChange:e=>i("title",e.target.value),error:r.title,required:!0}),(0,te.jsx)(Ye,{label:"Artist",placeholder:"Enter artist name...",value:o.artist,onChange:e=>i("artist",e.target.value),error:r.artist,required:!0}),(0,te.jsx)(Ye,{label:"Album",placeholder:"Enter album name...",value:o.album,onChange:e=>i("album",e.target.value),error:r.album,required:!0}),(0,te.jsx)(Ye,{label:"Description",placeholder:"Enter song description...",value:o.description||"",onChange:e=>i("description",e.target.value),multiline:!0,rows:3}),(0,te.jsx)(Ye,{label:"YouTube Link (Optional)",placeholder:"https://www.youtube.com/watch?v=...",value:o.youtubeUrl||"",onChange:e=>i("youtubeUrl",e.target.value),error:r.youtubeUrl}),(0,te.jsxs)(po,{children:[(0,te.jsx)(Ye,{label:"Year",type:"number",placeholder:"2024",min:"1900",max:(new Date).getFullYear()+1,value:o.year,onChange:e=>i("year",parseInt(e.target.value)||""),error:r.year,required:!0}),(0,te.jsxs)(go,{children:[(0,te.jsx)(uo,{children:"Genre"}),(0,te.jsxs)(mo,{value:o.genre,onChange:e=>i("genre",e.target.value),required:!0,children:[(0,te.jsx)("option",{value:"",children:"Select genre..."}),(0,te.jsx)("option",{value:"Traditional",children:"Traditional"}),(0,te.jsx)("option",{value:"Jazz",children:"Jazz"}),(0,te.jsx)("option",{value:"Pop",children:"Pop"}),(0,te.jsx)("option",{value:"Folk",children:"Folk"}),(0,te.jsx)("option",{value:"Reggae",children:"Reggae"}),(0,te.jsx)("option",{value:"Hip-Hop",children:"Hip-Hop"}),(0,te.jsx)("option",{value:"R&B",children:"R&B"}),(0,te.jsx)("option",{value:"Rock",children:"Rock"}),(0,te.jsx)("option",{value:"Blues",children:"Blues"}),(0,te.jsx)("option",{value:"Gospel",children:"Gospel"})]}),r.genre&&(0,te.jsx)(xo,{children:r.genre})]})]}),(0,te.jsxs)(po,{children:[(0,te.jsx)(Ye,{label:"Duration (seconds) - "+(s=o.duration,`${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`),type:"number",placeholder:"180",min:"1",max:"3600",value:o.duration,onChange:e=>i("duration",parseInt(e.target.value)||""),error:r.duration,required:!0}),(0,te.jsxs)(go,{children:[(0,te.jsx)(uo,{children:"Language"}),(0,te.jsxs)(mo,{value:o.language,onChange:e=>i("language",e.target.value),required:!0,children:[(0,te.jsx)("option",{value:"Amharic",children:"Amharic"}),(0,te.jsx)("option",{value:"Tigrinya",children:"Tigrinya"}),(0,te.jsx)("option",{value:"Oromo",children:"Oromo"}),(0,te.jsx)("option",{value:"English",children:"English"}),(0,te.jsx)("option",{value:"Arabic",children:"Arabic"}),(0,te.jsx)("option",{value:"Somali",children:"Somali"}),(0,te.jsx)("option",{value:"Afar",children:"Afar"}),(0,te.jsx)("option",{value:"Gurage",children:"Gurage"})]}),r.language&&(0,te.jsx)(xo,{children:r.language})]})]})]});var s},bo=()=>{const e=(0,s.wA)(),{isCreateModalOpen:o}=(0,s.d4)(e=>e.ui),{loading:t}=(0,s.d4)(e=>e.songs),[a,i]=(0,r.useState)({title:"",artist:"",album:"",year:(new Date).getFullYear(),genre:"",duration:180,language:"Amharic",description:"",youtubeUrl:""}),[n,l]=(0,r.useState)({}),d=()=>{e(M()),i({title:"",artist:"",album:"",year:(new Date).getFullYear(),genre:"",duration:180,language:"Amharic",description:"",youtubeUrl:""}),l({})},c=(0,te.jsxs)(te.Fragment,{children:[(0,te.jsx)(je,{variant:"secondary",onClick:d,disabled:t,children:"Cancel"}),(0,te.jsx)(je,{type:"submit",form:"create-song-form",loading:t,disabled:t,children:"Create Song"})]});return(0,te.jsx)(co,{isOpen:o,onClose:d,title:"Add New Song",footer:c,maxWidth:"600px",children:(0,te.jsx)(fo,{id:"create-song-form",formData:a,setFormData:i,errors:n,onSubmit:o=>{o.preventDefault(),(()=>{const e={};return a.title.trim()||(e.title="Title is required"),a.artist.trim()||(e.artist="Artist is required"),a.album.trim()||(e.album="Album is required"),a.genre.trim()||(e.genre="Genre is required"),(a.year<1900||a.year>(new Date).getFullYear()+1)&&(e.year="Please enter a valid year"),(a.duration<1||a.duration>3600)&&(e.duration="Duration must be between 1 and 3600 seconds"),a.youtubeUrl&&a.youtubeUrl.trim()&&(/^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/.test(a.youtubeUrl.trim())||(e.youtubeUrl="Please enter a valid YouTube URL")),l(e),0===Object.keys(e).length})()&&e(m(a))}})})},yo=()=>{const e=(0,s.wA)(),{isEditModalOpen:o}=(0,s.d4)(e=>e.ui),{loading:t,selectedSong:a}=(0,s.d4)(e=>e.songs),[i,n]=(0,r.useState)({title:"",artist:"",album:"",year:(new Date).getFullYear(),genre:"",duration:180,language:"Amharic",description:"",youtubeUrl:""}),[l,d]=(0,r.useState)({});(0,r.useEffect)(()=>{a&&n({title:a.title||"",artist:a.artist||"",album:a.album||"",year:a.year||(new Date).getFullYear(),genre:a.genre||"",duration:a.duration||180,language:a.language||"Amharic",description:a.description||"",youtubeUrl:a.youtubeUrl||""})},[a]);const c=()=>{e(D()),d({})},h=(0,te.jsxs)(te.Fragment,{children:[(0,te.jsx)(je,{variant:"secondary",onClick:c,disabled:t,children:"Cancel"}),(0,te.jsx)(je,{type:"submit",form:"edit-song-form",loading:t,disabled:t,children:"Update Song"})]});return(0,te.jsx)(co,{isOpen:o,onClose:c,title:"Edit Song",footer:h,maxWidth:"600px",children:(0,te.jsx)(fo,{id:"edit-song-form",formData:i,setFormData:n,errors:l,onSubmit:o=>{o.preventDefault(),(()=>{const e={};return i.title.trim()||(e.title="Title is required"),i.artist.trim()||(e.artist="Artist is required"),i.album.trim()||(e.album="Album is required"),i.genre.trim()||(e.genre="Genre is required"),(i.year<1900||i.year>(new Date).getFullYear()+1)&&(e.year="Please enter a valid year"),(i.duration<1||i.duration>3600)&&(e.duration="Duration must be between 1 and 3600 seconds"),i.youtubeUrl&&i.youtubeUrl.trim()&&(/^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/.test(i.youtubeUrl.trim())||(e.youtubeUrl="Please enter a valid YouTube URL")),d(e),0===Object.keys(e).length})()&&a&&(e(x({id:a.id,data:i})),c())}})})},$o=ae.A.div`
  text-align: center;
  padding: ${e=>e.theme.space[4]}px 0;
`,wo=ae.A.div`
  font-size: 4rem;
  margin-bottom: ${e=>e.theme.space[4]}px;
`,jo=ae.A.div`
  margin-bottom: ${e=>e.theme.space[4]}px;
`,vo=ae.A.h3`
  font-size: ${e=>e.theme.fontSizes.lg};
  font-weight: ${e=>e.theme.fontWeights.semibold};
  color: ${e=>e.theme.colors.gray[900]};
  margin: 0 0 ${e=>e.theme.space[2]}px 0;
`,So=ae.A.p`
  color: ${e=>e.theme.colors.gray[600]};
  margin: 0 0 ${e=>e.theme.space[4]}px 0;
`,Ao=ae.A.div`
  background-color: ${e=>e.theme.colors.gray[50]};
  border-radius: ${e=>e.theme.radii.md};
  padding: ${e=>e.theme.space[4]}px;
  text-align: left;
`,zo=ae.A.div`
  font-weight: ${e=>e.theme.fontWeights.semibold};
  color: ${e=>e.theme.colors.gray[900]};
  margin-bottom: ${e=>e.theme.space[1]}px;
`,ko=ae.A.div`
  color: ${e=>e.theme.colors.gray[600]};
  font-size: ${e=>e.theme.fontSizes.sm};
`,Co=()=>{const e=(0,s.wA)(),{isDeleteModalOpen:o}=(0,s.d4)(e=>e.ui),{loading:t,selectedSong:r}=(0,s.d4)(e=>e.songs),a=()=>{e(Y())},i=(0,te.jsxs)(te.Fragment,{children:[(0,te.jsx)(je,{variant:"secondary",onClick:a,disabled:t,children:"Cancel"}),(0,te.jsx)(je,{variant:"danger",onClick:()=>{r&&(e(y(r.id)),a())},loading:t,disabled:t,children:"Delete Song"})]});return(0,te.jsx)(co,{isOpen:o,onClose:a,title:"Delete Song",footer:i,maxWidth:"500px",children:(0,te.jsxs)($o,{children:[(0,te.jsx)(wo,{children:"⚠️"}),(0,te.jsxs)(jo,{children:[(0,te.jsx)(vo,{children:"Are you sure you want to delete this song?"}),(0,te.jsx)(So,{children:"This action cannot be undone. The song will be permanently removed from your collection."})]}),r&&(0,te.jsxs)(Ao,{children:[(0,te.jsx)(zo,{children:r.title}),(0,te.jsxs)(ko,{children:["by ",r.artist]})]})]})})},Eo=ae.A.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space[6]}px;
`,Mo=ae.A.div`
  text-align: center;
  padding-bottom: ${e=>e.theme.space[4]}px;
  border-bottom: 1px solid ${e=>e.theme.colors.gray[200]};
`,Oo=ae.A.h2`
  font-size: ${e=>e.theme.fontSizes["2xl"]};
  font-weight: ${e=>e.theme.fontWeights.bold};
  color: ${e=>e.theme.colors.gray[900]};
  margin: 0 0 ${e=>e.theme.space[2]}px 0;
`,Do=ae.A.h3`
  font-size: ${e=>e.theme.fontSizes.xl};
  font-weight: ${e=>e.theme.fontWeights.medium};
  color: ${e=>e.theme.colors.primary[600]};
  margin: 0 0 ${e=>e.theme.space[3]}px 0;
`,Fo=ae.A.p`
  font-size: ${e=>e.theme.fontSizes.lg};
  color: ${e=>e.theme.colors.gray[600]};
  margin: 0;
`,Yo=ae.A.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${e=>e.theme.space[4]}px;
  padding: ${e=>e.theme.space[4]}px 0;
  border-bottom: 1px solid ${e=>e.theme.colors.gray[200]};
`,Wo=ae.A.div`
  text-align: center;
`,To=ae.A.div`
  font-size: ${e=>e.theme.fontSizes.xs};
  font-weight: ${e=>e.theme.fontWeights.semibold};
  color: ${e=>e.theme.colors.gray[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${e=>e.theme.space[1]}px;
`,Po=ae.A.div`
  font-size: ${e=>e.theme.fontSizes.sm};
  font-weight: ${e=>e.theme.fontWeights.medium};
  color: ${e=>e.theme.colors.gray[900]};
`,Ho=ae.A.span`
  display: inline-block;
  padding: ${e=>e.theme.space[1]}px ${e=>e.theme.space[3]}px;
  background-color: ${e=>e.theme.colors.primary[100]};
  color: ${e=>e.theme.colors.primary[700]};
  border-radius: ${e=>e.theme.radii.full};
  font-size: ${e=>e.theme.fontSizes.xs};
  font-weight: ${e=>e.theme.fontWeights.medium};
`,Uo=ae.A.span`
  display: inline-block;
  padding: ${e=>e.theme.space[1]}px ${e=>e.theme.space[3]}px;
  background-color: ${e=>e.theme.colors.secondary[100]};
  color: ${e=>e.theme.colors.secondary[700]};
  border-radius: ${e=>e.theme.radii.full};
  font-size: ${e=>e.theme.fontSizes.xs};
  font-weight: ${e=>e.theme.fontWeights.medium};
`,qo=ae.A.div`
  padding: ${e=>e.theme.space[4]}px 0;
`,Jo=ae.A.h4`
  font-size: ${e=>e.theme.fontSizes.lg};
  font-weight: ${e=>e.theme.fontWeights.semibold};
  color: ${e=>e.theme.colors.gray[900]};
  margin: 0 0 ${e=>e.theme.space[3]}px 0;
`,Io=ae.A.p`
  font-size: ${e=>e.theme.fontSizes.base};
  line-height: ${e=>e.theme.lineHeights.relaxed};
  color: ${e=>e.theme.colors.gray[700]};
  margin: 0;
`,Lo=ae.A.div`
  padding: ${e=>e.theme.space[4]}px 0;
  text-align: center;
`,Ro=(0,ae.A)(je)`
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  color: white;
  border: none;
  font-weight: ${e=>e.theme.fontWeights.semibold};
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #cc0000 0%, #990000 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px 0 rgba(255, 0, 0, 0.3);
  }
  
  &::before {
    content: '▶';
    margin-right: ${e=>e.theme.space[2]}px;
    font-size: ${e=>e.theme.fontSizes.sm};
  }
`,No=()=>{const e=(0,s.wA)(),{isSongDetailsModalOpen:o,selectedSong:t}=(0,s.d4)(e=>e.ui),r=()=>{e(T())};if(!t)return null;const a=(0,te.jsx)(je,{variant:"secondary",onClick:r,children:"Close"});return(0,te.jsx)(co,{isOpen:o,onClose:r,title:"Song Details",footer:a,maxWidth:"700px",children:(0,te.jsxs)(Eo,{children:[(0,te.jsxs)(Mo,{children:[(0,te.jsx)(Oo,{children:t.title}),(0,te.jsx)(Do,{children:t.artist}),(0,te.jsx)(Fo,{children:t.album})]}),(0,te.jsxs)(Yo,{children:[(0,te.jsxs)(Wo,{children:[(0,te.jsx)(To,{children:"Year"}),(0,te.jsx)(Po,{children:t.year})]}),(0,te.jsxs)(Wo,{children:[(0,te.jsx)(To,{children:"Genre"}),(0,te.jsx)(Po,{children:(0,te.jsx)(Ho,{children:t.genre})})]}),(0,te.jsxs)(Wo,{children:[(0,te.jsx)(To,{children:"Duration"}),(0,te.jsx)(Po,{children:(i=t.duration,`${Math.floor(i/60)}:${(i%60).toString().padStart(2,"0")}`)})]}),(0,te.jsxs)(Wo,{children:[(0,te.jsx)(To,{children:"Language"}),(0,te.jsx)(Po,{children:(0,te.jsx)(Uo,{children:t.language})})]})]}),t.description&&(0,te.jsxs)(qo,{children:[(0,te.jsx)(Jo,{children:"About This Song"}),(0,te.jsx)(Io,{children:t.description})]}),(0,te.jsx)(Lo,{children:(0,te.jsx)(Ro,{onClick:()=>{if(t)if(t.youtubeUrl&&t.youtubeUrl.trim())window.open(t.youtubeUrl,"_blank");else{const e=`${t.title} ${t.artist} Ethiopian music`,o=`https://www.youtube.com/results?search_query=${encodeURIComponent(e)}`;window.open(o,"_blank")}},children:t.youtubeUrl&&t.youtubeUrl.trim()?"Watch on YouTube":"Search on YouTube"})})]})});var i},Bo=()=>(0,te.jsxs)(te.Fragment,{children:[(0,te.jsx)(bo,{}),(0,te.jsx)(yo,{}),(0,te.jsx)(Co,{}),(0,te.jsx)(No,{})]}),Go=ae.A.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${e=>e.theme.space[4]}px;
  flex-wrap: wrap;
  margin-top: ${e=>e.theme.space[8]}px;
  padding: ${e=>e.theme.space[6]}px;
  background: ${e=>e.theme.colors.white};
  border: 1px solid ${e=>e.theme.colors.gray[200]};
  border-radius: ${e=>e.theme.radii.xl};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
`,_o=ae.A.div`
  font-size: ${e=>e.theme.fontSizes.sm};
  color: ${e=>e.theme.colors.gray[600]};
  font-weight: ${e=>e.theme.fontWeights.medium};
  flex: 1;
  
  @media (max-width: ${e=>e.theme.breakpoints[0]}) {
    margin-bottom: ${e=>e.theme.space[4]}px;
    flex: none;
    width: 100%;
  }
`,Ko=ae.A.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space[4]}px;
  
  @media (max-width: ${e=>e.theme.breakpoints[0]}) {
    width: 100%;
    justify-content: space-between;
  }
`,Zo=ae.A.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space[2]}px;
`,Qo=ae.A.span`
  font-size: ${e=>e.theme.fontSizes.sm};
  color: ${e=>e.theme.colors.gray[600]};
  font-weight: ${e=>e.theme.fontWeights.medium};
`,Xo=ae.A.select`
  padding: ${e=>e.theme.space[3]}px ${e=>e.theme.space[4]}px;
  padding-right: ${e=>e.theme.space[8]}px;
  border: 1px solid ${e=>e.theme.colors.gray[300]};
  border-radius: ${e=>e.theme.radii.lg};
  font-size: ${e=>e.theme.fontSizes.sm};
  font-weight: ${e=>e.theme.fontWeights.medium};
  background-color: ${e=>e.theme.colors.white};
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right ${e=>e.theme.space[3]}px center;
  background-repeat: no-repeat;
  background-size: 16px;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  appearance: none;
  min-width: 80px;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${e=>e.theme.colors.primary[100]}, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }
  
  &:hover:not(:focus) {
    border-color: ${e=>e.theme.colors.gray[400]};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`,Vo=ae.A.div`
  display: flex;
  gap: ${e=>e.theme.space[1]}px;
`,et=(0,ae.A)(je)`
  min-width: 40px;
  height: 40px;
  padding: 0;
  border-radius: ${e=>e.theme.radii.lg};
`,ot=(0,ae.A)(je)`
  height: 40px;
  padding: 0 ${e=>e.theme.space[4]}px;
  border-radius: ${e=>e.theme.radii.lg};
  font-size: ${e=>e.theme.fontSizes.sm};
  font-weight: ${e=>e.theme.fontWeights.medium};
  min-width: auto;
  white-space: nowrap;
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,tt=()=>{const e=(0,s.wA)(),{currentPage:o,totalPages:t,totalSongs:r,pageSize:a}=(0,s.d4)(e=>e.songs),i=o=>{o>=1&&o<=t&&e(j(o))};if(0===r)return null;const n=(o-1)*a+1,l=Math.min(o*a,r),d=(()=>{const e=[],r=[];for(let r=Math.max(2,o-2);r<=Math.min(t-1,o+2);r++)e.push(r);return o-2>2?r.push(1,"..."):r.push(1),r.push(...e),o+2<t-1?r.push("...",t):t>1&&r.push(t),r})();return(0,te.jsxs)(Go,{children:[(0,te.jsxs)(_o,{children:["Showing ",n," to ",l," of ",r," songs"]}),(0,te.jsxs)(Ko,{children:[(0,te.jsxs)(Zo,{children:[(0,te.jsx)(Qo,{children:"Show:"}),(0,te.jsxs)(Xo,{value:a,onChange:o=>{e(v(parseInt(o.target.value)))},children:[(0,te.jsx)("option",{value:5,children:"5"}),(0,te.jsx)("option",{value:10,children:"10"}),(0,te.jsx)("option",{value:20,children:"20"}),(0,te.jsx)("option",{value:50,children:"50"})]})]}),t>1&&(0,te.jsxs)(Vo,{children:[(0,te.jsx)(ot,{variant:"secondary",disabled:1===o,onClick:()=>i(o-1),children:"Previous"}),d.map((e,t)=>(0,te.jsx)(et,{variant:e===o?"primary":"secondary",size:"sm",disabled:"..."===e,onClick:()=>"number"==typeof e&&i(e),children:e},t)),(0,te.jsx)(ot,{variant:"secondary",disabled:o===t,onClick:()=>i(o+1),children:"Next"})]})]})]})},rt=ae.A.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space[6]}px;
`,at=ae.A.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space[4]}px;
`,it=()=>{const e=(0,s.wA)(),{currentPage:o,pageSize:t,filters:a,loading:i}=(0,s.d4)(e=>e.songs);return(0,r.useEffect)(()=>{e(c({page:o,pageSize:t,filters:a}))},[e,o,t,a]),(0,te.jsxs)(rt,{children:[(0,te.jsx)(Ce,{}),(0,te.jsx)(Ue,{}),(0,te.jsxs)(at,{children:[(0,te.jsx)(eo,{}),(0,te.jsx)(tt,{})]}),(0,te.jsx)(Bo,{})]})},st=function(){return(0,te.jsxs)(V.a,{theme:ee,children:[(0,te.jsx)(re,{}),(0,te.jsx)($e,{children:(0,te.jsx)(it,{})})]})};var nt=t(5243);const lt="ethiopop_archive_songs",dt=()=>{try{const e=localStorage.getItem(lt);if(e)return JSON.parse(e)}catch(e){console.warn("Failed to load songs from localStorage:",e)}const e=(()=>{const e=["Tizita","Ambassel","Yekermo Sew","Shemonmuanaye","Yegelle Tezeta","Muziqawi Silt","Anchi Hoye","Yene Konjo","Almaz Yeharerwa","Tew Semagn Hagere","Yefikir Woha","Sew Manen New","Yetim Hager","Anchin Kal","Yene Habesha","Tilahun Gessesse","Aster Aweke","Gigi Shibabaw","Teddy Afro","Ephrem Tamiru"],o=["Tilahun Gessesse","Aster Aweke","Mahmoud Ahmed","Alemayehu Eshete","Mulatu Astatke","Gigi Shibabaw","Teddy Afro","Ephrem Tamiru","Kassa Tessema","Bezawork Asfaw","Neway Debebe","Hirut Bekele","Roha Band","Walias Band","Ibex Band","Kaifa Band"],t=["Golden Years","Ethiopian Hits","Tizita Collection","Modern Ethiopia","Classic Sounds","Heritage Songs","New Generation","Traditional Melodies","Contemporary Mix","Vintage Collection","Best of Ethiopia","Cultural Sounds"],r=["Traditional","Jazz","Pop","Folk","Reggae","Hip-Hop","R&B","Rock"],a=["Amharic","Tigrinya","Oromo","English"],i=["A beautiful traditional Ethiopian song that captures the essence of nostalgia and longing, deeply rooted in Ethiopian musical heritage.","An uplifting modern composition blending traditional Ethiopian melodies with contemporary arrangements, celebrating cultural identity.","A soulful ballad expressing love and devotion, featuring traditional Ethiopian instruments and heartfelt vocals.","A rhythmic celebration of Ethiopian culture, combining ancient musical traditions with modern production techniques.","An emotional journey through Ethiopian history, told through powerful lyrics and traditional musical arrangements.","A contemporary interpretation of classic Ethiopian folk music, bridging generations through timeless melodies.","A spiritual composition reflecting Ethiopian Orthodox traditions, featuring traditional chants and modern harmonies.","An energetic fusion of Ethiopian jazz and traditional music, showcasing the rich musical diversity of Ethiopia.","A romantic ballad celebrating Ethiopian love stories, with poetic lyrics and beautiful instrumental arrangements.","A patriotic anthem honoring Ethiopian heritage, combining traditional instruments with powerful vocal performances.","A meditative piece inspired by Ethiopian landscapes, featuring ambient sounds and traditional melodies.","A festive celebration song perfect for Ethiopian holidays and cultural gatherings, full of joy and energy.","A contemplative composition exploring themes of identity and belonging in Ethiopian culture.","A dynamic fusion piece blending Ethiopian traditional music with contemporary world music influences.","A heartfelt tribute to Ethiopian mothers and families, featuring tender vocals and traditional accompaniment."],s=["https://www.youtube.com/watch?v=dQw4w9WgXcQ","https://www.youtube.com/watch?v=3JZ_D3ELwOQ","https://youtu.be/kJQP7kiw5Fk","https://www.youtube.com/watch?v=9bZkp7q19f0","","https://www.youtube.com/watch?v=2Vv-BfVoq4g","","https://youtu.be/60ItHLz5WEA","https://www.youtube.com/watch?v=fJ9rUzIMcZQ","","https://www.youtube.com/watch?v=ZZ5LpwO-An4","https://youtu.be/HEXWRTEbj1I","","https://www.youtube.com/watch?v=L_jWHffIx5E","https://www.youtube.com/watch?v=kffacxfA7G4"];return Array.from({length:20},(n,l)=>({id:`default-${l+1}`,title:e[l%e.length],artist:o[l%o.length],album:t[l%t.length],year:Math.floor(64*Math.random()+1960),genre:r[l%r.length],duration:Math.floor(300*Math.random()+120),language:a[l%a.length],description:i[l%i.length],youtubeUrl:s[l%s.length],createdAt:(new Date).toISOString(),isDefault:!0}))})();return ct(e),e},ct=e=>{try{localStorage.setItem(lt,JSON.stringify(e))}catch(e){console.warn("Failed to save songs to localStorage:",e)}};!function({environment:e="development"}={}){(0,nt.sA)({environment:e,routes(){this.namespace="api",this.get("/songs",(e,o)=>{const{queryParams:t}=o,r=parseInt(t.page)||1,a=parseInt(t.limit)||10,i=t.search||"",s=t.artist||"",n=t.album||"",l=t.year||"";let d=dt();i&&(d=d.filter(e=>e.title.toLowerCase().includes(i.toLowerCase())||e.artist.toLowerCase().includes(i.toLowerCase()))),s&&(d=d.filter(e=>e.artist.toLowerCase().includes(s.toLowerCase()))),n&&(d=d.filter(e=>e.album.toLowerCase().includes(n.toLowerCase()))),l&&(d=d.filter(e=>e.year.toString()===l));const c=d.length,h=Math.ceil(c/a),p=(r-1)*a,m=p+a;return{songs:d.slice(p,m),currentPage:r,totalPages:h,totalSongs:c,pageSize:a}}),this.post("/songs",(e,o)=>{const t=JSON.parse(o.requestBody),r=dt(),a={...t,id:`song-${Date.now()}-${Math.random().toString(36).substring(2,11)}`,createdAt:(new Date).toISOString(),isDefault:!1};return r.unshift(a),ct(r),a}),this.put("/songs/:id",(e,o)=>{const t=o.params.id,r=JSON.parse(o.requestBody),a=dt(),i=a.findIndex(e=>e.id===t);if(-1===i)return new nt.YK(404,{},{error:"Song not found"});const s={...a[i],...r,updatedAt:(new Date).toISOString()};return a[i]=s,ct(a),s}),this.delete("/songs/:id",(e,o)=>{const t=o.params.id,r=dt(),a=r.findIndex(e=>e.id===t);return-1===a?new nt.YK(404,{},{error:"Song not found"}):(r.splice(a,1),ct(r),new nt.YK(204))}),this.get("/songs/:id",(e,o)=>{const t=o.params.id;return dt().find(e=>e.id===t)||new nt.YK(404,{},{error:"Song not found"})})}})}();const ht=document.getElementById("root");(0,i.H)(ht).render((0,te.jsx)(a().StrictMode,{children:(0,te.jsx)(s.Kq,{store:X,children:(0,te.jsx)(st,{})})}))}},t={};function r(e){var a=t[e];if(void 0!==a)return a.exports;var i=t[e]={id:e,loaded:!1,exports:{}};return o[e](i,i.exports,r),i.loaded=!0,i.exports}r.m=o,e=[],r.O=(o,t,a,i)=>{if(!t){var s=1/0;for(c=0;c<e.length;c++){for(var[t,a,i]=e[c],n=!0,l=0;l<t.length;l++)(!1&i||s>=i)&&Object.keys(r.O).every(e=>r.O[e](t[l]))?t.splice(l--,1):(n=!1,i<s&&(s=i));if(n){e.splice(c--,1);var d=a();void 0!==d&&(o=d)}}return o}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[t,a,i]},r.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return r.d(o,{a:o}),o},r.d=(e,o)=>{for(var t in o)r.o(o,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={792:0};r.O.j=o=>0===e[o];var o=(o,t)=>{var a,i,[s,n,l]=t,d=0;if(s.some(o=>0!==e[o])){for(a in n)r.o(n,a)&&(r.m[a]=n[a]);if(l)var c=l(r)}for(o&&o(t);d<s.length;d++)i=s[d],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(c)},t=self.webpackChunkethiopop_archive=self.webpackChunkethiopop_archive||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))})();var a=r.O(void 0,[96],()=>r(268));a=r.O(a)})();
//# sourceMappingURL=main.a9479ef58983965cf6d9.js.map