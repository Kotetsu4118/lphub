<x-app-layout>
    <div>
        @foreach($tags as $tag)
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-1">
                <div class=" bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class='flex justify-between'>
                        <div class='p-4'>
                            {{ $tag->name }}
                        </div>
                        @auth
                        <div align='right' class='p-2' >
                            <a href='/tags/{{ $tag->id }}/edit_t'>
                                <x-primary-button>{{ __('編集') }}</x-primary-button>
                            </a>
                        </div>
                        @endauth
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</x-app-layout>