<x-app-layout>

    
    <div class="flex py-4 pl-3 space-x-8">
        <div>
            @component('components/select_language',[
                'languages' => $languages,
                'selected'=>NULL,
            ])
            @endcomponent
        </div>
        
        <div>
            <form action='/home_search/{search_word}' method='GET'>
                <div class='flex'>
                    <x-text-input id='search_word' name='search_word' class=" mt-1 block h-8" :value="old('search_word')"/>
                    <x-input-error :messages="$errors->get('search_word')" class="mt-2" />
                    
                    <x-primary-button class=''>{{ __('検索') }}</x-primary-button>
                
                </div>
            </form>
        </div>
        
    </div>
    
    @include('layouts.home')

</x-app-layout>