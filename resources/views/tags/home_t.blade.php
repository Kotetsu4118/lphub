<x-app-layout>

    {{--    
    <div class="py-4 pl-3">
        @component('components/select_language',[
            'languages' => $languages,
            'selected'=>NULL,
        ])
        @endcomponent
    </div>
    --}}
    
    
    
    <div class="pt-2">
        <div class='pl-3'>
            検索結果：{{ $tag_name }}
        </div>
    </div>   
    @if($questions[0]==NULL)
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div align='center'>このタグが付いた問題はありません</div>
        </div>
    @endif
    
    @include('layouts.home_layout')
        
    
        
</x-app-layout>